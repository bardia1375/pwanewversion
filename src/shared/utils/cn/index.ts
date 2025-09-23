import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * A utility function that combines clsx and tailwind-merge for handling Tailwind CSS classes
 * 
 * Features:
 * - Handles conditional classes
 * - Merges conflicting Tailwind classes correctly
 * - Supports arrays, objects, and nested structures
 * - Type-safe with TypeScript
 * 
 * @param inputs - Any number of class values (strings, objects, arrays)
 * @returns Merged and cleaned class string
 * 
 * @example
 * // Basic usage
 * cn('px-4 py-2', 'bg-blue-500')
 * // => 'px-4 py-2 bg-blue-500'
 * 
 * @example
 * // With conditions
 * cn('px-4', {
 *   'bg-blue-500': isPrimary,
 *   'bg-gray-500': !isPrimary
 * })
 * 
 * @example
 * // Handling conflicting classes
 * cn('px-4 bg-red-500', 'bg-blue-500')
 * // => 'px-4 bg-blue-500'
 * 
 * @example
 * // With dynamic values
 * cn('px-4', responsive && 'md:px-6', className)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Creates a variant handler for components with different visual states
 * 
 * @param variants - Object containing variant definitions
 * @returns A function that combines variant classes with additional classes
 * 
 * @example
 * const buttonVariants = createVariants({
 *   variant: {
 *     primary: 'bg-blue-500 text-white',
 *     secondary: 'bg-gray-500 text-white',
 *     ghost: 'bg-transparent hover:bg-gray-100'
 *   },
 *   size: {
 *     sm: 'px-2 py-1 text-sm',
 *     md: 'px-4 py-2',
 *     lg: 'px-6 py-3 text-lg'
 *   }
 * });
 */
export function createVariants<
  V extends Record<string, Record<string, string>>
>(variants: V) {
  type VariantProps = {
    [K in keyof V]?: keyof V[K];
  };

  return function (props: VariantProps & { className?: string }) {
    const variantClasses = Object.keys(variants).map((variantKey) => {
      const variantValue = props[variantKey as keyof VariantProps];
      if (!variantValue) return '';
      return variants[variantKey][variantValue as string] || '';
    });

    return cn(...variantClasses, props.className);
  };
}

/**
 * Creates responsive class names based on breakpoints
 * 
 * @param baseClasses - Base classes for all screen sizes
 * @param responsive - Object containing classes for different breakpoints
 * @returns Combined and responsive class string
 * 
 * @example
 * createResponsive('p-4', {
 *   sm: 'p-6',
 *   md: 'p-8',
 *   lg: 'p-10'
 * })
 * // => 'p-4 sm:p-6 md:p-8 lg:p-10'
 */
export function createResponsive(
  baseClasses: string,
  responsive: Partial<Record<'sm' | 'md' | 'lg' | 'xl' | '2xl', string>>
): string {
  const responsiveClasses = Object.entries(responsive)
    .map(([breakpoint, classes]) => `${breakpoint}:${classes}`)
    .join(' ');

  return cn(baseClasses, responsiveClasses);
}

/**
 * Type for component variants with default values
 */
export type VariantProps<T> = {
  [K in keyof T]: keyof T[K];
};
