import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MissionCard from "../../../MyMissions/pages/MissionCard";
import LeaveCard from "../../../MyLeaves/pages/LeaveCard";
import PerformanceCard from "../../../MyClocking/pages/PerformanceCard";
import { getMissions } from "../../../MyMissions/services/missionService";
import { getLeaves } from "../../../MyLeaves/services/leaveService";
import { getPerformance } from "../../../MyClocking/services/clockingService";
import Chart from "react-apexcharts";
import type { Leave } from "../../../MyLeaves/types";

interface Tab {
  id: string;
  label: string;
}

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: string;
}

const tabs: Tab[] = [
  { id: "missions", label: "مأموریت" },
  { id: "leaves", label: "مرخصی" },
  { id: "performance", label: "کارکرد" },
  { id: "charts", label: "دیاگرام" },
];

export const StoryModal: React.FC<StoryModalProps> = ({
  isOpen,
  onClose,
  defaultTab = "missions",
}) => {
  const [currentSlide, setCurrentSlide] = useState(
    tabs.findIndex((tab) => tab.id === defaultTab)
  );
  const [missions, setMissions] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [performance, setPerformance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showButtons, setShowButtons] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  // Track previous tab index for conditional haptics
  const prevSlideRef = useRef<number | null>(null);
  const firstRenderRef = useRef(true);

  const handleDeleteLeave = (id: number) => {
    setLeaves(leaves.filter(leave => leave.id !== id));
  };
  
  const handleCopyLeave = (leave: Leave) => {
    console.log('Leave copied:', leave);
    // Here you would implement the actual copy functionality
    // For example, copy leave details to clipboard
    const leaveDetails = `${leave.reason}: ${leave.startDate}${leave.endDate !== leave.startDate ? ` تا ${leave.endDate}` : ''}`;
    
    // Using navigator clipboard API if available
    if (navigator.clipboard) {
      navigator.clipboard.writeText(leaveDetails)
        .then(() => console.log('Leave details copied to clipboard'))
        .catch(err => console.error('Could not copy text: ', err));
    }
  };

  // Conditional haptic feedback ONLY when user leaves the 'leaves' tab to another tab
  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    const prevIndex = prevSlideRef.current;
    prevSlideRef.current = currentSlide;
    if (!isOpen) return;

    if (prevIndex == null) return;
    const prevId = tabs[prevIndex]?.id;
    const newId = tabs[currentSlide]?.id;
    if (!prevId || !newId) return;

    // Fire haptic only when moving away from 'leaves' (مرخصی) to any other tab
    if (prevId === 'leaves' && newId !== 'leaves') {
      try {
        if (typeof window !== 'undefined' && 'vibrate' in navigator) {
          // Pattern: subtle double-tap style (if supported); fallback single
          const vibrated = navigator.vibrate?.([14, 30, 12]) || false;
          if (!vibrated) navigator.vibrate?.(20);
        }
      } catch {
        // ignore silently
      }
    }
  }, [currentSlide, isOpen]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [missionsData, leavesData, performanceData] = await Promise.all([
          getMissions(),
          getLeaves(),
          getPerformance(),
        ]);
        setMissions(missionsData);
        setLeaves(leavesData);
        setPerformance(performanceData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const chartsData = useMemo(() => {
    // Mock example data – replace with real aggregated data if needed
    const categories = [
      "فروردین",
      "اردیبهشت",
      "خرداد",
      "تیر",
      "مرداد",
      "شهریور",
    ];

    return {
      bar: {
        series: [{ name: "حضور", data: [40, 55, 57, 50, 49, 65] }],
        options: {
          chart: {
            type: "bar",
            toolbar: { show: false },
            fontFamily: "inherit",
          },
          plotOptions: {
            bar: { borderRadius: 6, columnWidth: "45%" },
          },
          dataLabels: { enabled: false },
          xaxis: { categories },
          colors: ["#1a3766"],
          tooltip: { theme: "light" },
        },
      },
      line: {
        series: [{ name: "کارکرد", data: [8, 7.5, 8.2, 7.8, 8.4, 8.1] }],
        options: {
          chart: {
            type: "line",
            toolbar: { show: false },
            fontFamily: "inherit",
          },
          stroke: { curve: "smooth", width: 4 },
          dataLabels: { enabled: false },
          xaxis: { categories: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور"] },
          colors: ["#6ec6e7"],
          markers: {
            size: 5,
            colors: ["#fff"],
            strokeColors: "#6ec6e7",
            strokeWidth: 3,
          },
        },
      },
      area: {
        series: [{ name: "مرخصی", data: [2, 1, 3, 4, 2, 1] }],
        options: {
          chart: {
            type: "area",
            toolbar: { show: false },
            fontFamily: "inherit",
          },
          dataLabels: { enabled: false },
          stroke: { curve: "smooth", width: 3 },
          fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.5,
              opacityTo: 0.05,
              stops: [0, 90, 100],
            },
          },
          xaxis: { categories },
          colors: ["#0d2b6b"],
        },
      },
      pie: {
        series: [44, 33, 12, 11],
        options: {
          chart: { type: "donut" },
          labels: ["حضور", "ماموریت", "مرخصی", "غیبت"],
          colors: ["#1a3766", "#6ec6e7", "#0d2b6b", "#bbbbbb"],
          legend: { position: "bottom", fontFamily: "inherit" },
          dataLabels: { dropShadow: { enabled: false } },
        },
      },
      horizontal: {
        series: [{ name: "تعداد", data: [15, 9, 22, 11] }],
        options: {
          chart: {
            type: "bar",
            toolbar: { show: false },
            fontFamily: "inherit",
          },
          plotOptions: {
            bar: {
              horizontal: true,
              borderRadius: 6,
              barHeight: "55%",
            },
          },
          dataLabels: { enabled: false },
          xaxis: { categories: ["پروژه A", "پروژه B", "پروژه C", "پروژه D"] },
          colors: ["#264785"],
        },
      },
      radial: {
        series: [76],
        options: {
          chart: { type: "radialBar", toolbar: { show: false } },
          colors: ["#1a3766"],
          plotOptions: {
            radialBar: {
              hollow: { size: "60%" },
              dataLabels: { value: { fontSize: "20px" } },
            },
          },
          labels: ["انجام شده"],
        },
      },
    };
  }, []);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            className="relative h-full"
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.7}
            dragMomentum={false}
            onDragEnd={(e, info) => {
              if (info.offset.y > 100) {
                onClose();
              }
            }}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }} /* تغییر جهت خروج به پایین */
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            dragListener={false}
          >
            {/* Header Section */}
            <motion.div
              className="w-full bg-gradient-to-b from-[#0d2b6b] to-[#6ec6e7] pt-4 px-4 h-60 cursor-grab active:cursor-grabbing relative"
              onPointerDown={() => (document.body.style.cursor = "grabbing")}
              onPointerUp={() => (document.body.style.cursor = "auto")}
            >
              {/* دکمه ضربدر برای بستن مدال - دو طرف صفحه */}
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white z-20 hover:bg-black/30 transition-colors"
                aria-label="بستن"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" fill="currentColor" />
                </svg>
              </button>
              
              {/* دکمه ضربدر بزرگتر در سمت چپ
              <button 
                onClick={onClose}
                className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white z-20 hover:bg-white/20 transition-colors shadow-md"
                aria-label="بستن"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" fill="currentColor" />
                </svg>
              </button> */}
              
              {/* <div className="text-white font-bold text-xl text-center mb-3 select-none">
                شرکت جهان گستر
              </div> */}
              <div 
                className="relative h-40 w-full overflow-visible select-none"
                onTouchStart={(e) => {
                  // کد مخصوص لمسی برای موبایل و تبلت
                  const touch = e.touches[0];
                  const startX = touch.clientX;
                  
                  const handleTouchMove = (e) => {
                    const touch = e.touches[0];
                    // استفاده از متغیر diffX در آینده
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const diffX = touch.clientX - startX;
                    
                    // اعمال حالت کشیدن روی المان‌ها
                    document.body.style.cursor = "grabbing";
                  };
                  
                  const handleTouchEnd = (e) => {
                    document.body.style.cursor = "auto";
                    
                    if (e.changedTouches.length === 0) return;
                    const touch = e.changedTouches[0];
                    const diffX = touch.clientX - startX;
                    
                    // تشخیص جهت و اعمال تغییر تب
                    if (diffX < -50 && currentSlide < tabs.length - 1) {
                      setCurrentSlide((prev) => Math.min(tabs.length - 1, prev + 1));
                    } else if (diffX > 50 && currentSlide > 0) {
                      setCurrentSlide((prev) => Math.max(0, prev - 1));
                    }
                    
                    // حذف لیسنرها
                    document.removeEventListener("touchmove", handleTouchMove);
                    document.removeEventListener("touchend", handleTouchEnd);
                  };
                  
                  // اضافه کردن لیسنرها به داکیومنت
                  document.addEventListener("touchmove", handleTouchMove, { passive: false });
                  document.addEventListener("touchend", handleTouchEnd);
                }}
              >
                {/* Swipe Layer */}
                <motion.div
                  className="absolute inset-0"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.4}
                  dragTransition={{ 
                    bounceStiffness: 500, 
                    bounceDamping: 25
                  }}
                  whileDrag={{ scale: 0.98 }}
                  onDragStart={() => {
                    document.body.style.cursor = "grabbing";
                  }}
                  onDragEnd={(e, info) => {
                    document.body.style.cursor = "auto";
                    
                    // اعمال تغییر بر اساس مقدار و سرعت کشیدن
                    const swipeThreshold = 40;
                    const velocity = info.velocity.x;
                    const offset = info.offset.x;
                    
                    if ((offset < -swipeThreshold || velocity < -300) && currentSlide < tabs.length - 1) {
                      setCurrentSlide((prev) => Math.min(tabs.length - 1, prev + 1));
                    } else if ((offset > swipeThreshold || velocity > 300) && currentSlide > 0) {
                      setCurrentSlide((prev) => Math.max(0, prev - 1));
                    }
                  }}
                />
                {/* Tabs Positioned */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {tabs.map((tab, index) => {
                    const diff = Math.abs(index - currentSlide);
                    const scale = diff === 0 ? 1 : diff === 1 ? 0.8 : 0.6;
                    const opacity = diff > 2 ? 0 : diff === 2 ? 0.35 : 1;
                    const translateX = (index - currentSlide) * 120; // spacing
                    return (
                      <motion.button
                        key={tab.id}
                        onClick={() => setCurrentSlide(index)}
                        className="absolute flex flex-col items-center gap-2 outline-none"
                        style={{ pointerEvents: 'auto' }}
                        animate={{
                          x: translateX,
                          scale,
                          opacity,
                          zIndex: 100 - diff,
                        }}
                        initial={false}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      >
                        <motion.div
                          className={`w-24 h-24 rounded-full flex flex-col items-center justify-center shadow-lg relative overflow-hidden transition-colors
                            ${index === currentSlide ? 'bg-white text-[#1a3766]' : 'bg-white/10 text-white'}
                          `}
                          whileHover={{ scale: index === currentSlide ? 1.05 : 1.02 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div className="flex flex-col items-center gap-2">
                            {tab.id === 'missions' && (
                              <>
                                <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill={index === currentSlide ? '#1a3766' : '#fff'} />
                                </svg>
                                <span className={`text-xs font-bold ${index === currentSlide ? 'text-[#1a3766]' : 'text-white'}`}>
                                  {tab.label}
                                </span>
                              </>
                            )}
                            {tab.id === 'leaves' && (
                              <>
                                <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" fill={index === currentSlide ? '#1a3766' : '#fff'} />
                                </svg>
                                <span className={`text-xs font-bold ${index === currentSlide ? 'text-[#1a3766]' : 'text-white'}`}>
                                  {tab.label}
                                </span>
                              </>
                            )}
                            {tab.id === 'performance' && (
                              <>
                                <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill={index === currentSlide ? '#1a3766' : '#fff'} />
                                </svg>
                                <span className={`text-xs font-bold ${index === currentSlide ? 'text-[#1a3766]' : 'text-white'}`}>
                                  {tab.label}
                                </span>
                              </>
                            )}
                            {tab.id === 'charts' && (
                              <>
                                <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                                  <path d="M3 3h2v18H3V3zm16 8h2v10h-2V11zM7 13h2v8H7v-8zm4-6h2v14h-2V7z" fill={index === currentSlide ? '#1a3766' : '#fff'} />
                                </svg>
                                <span className={`text-xs font-bold ${index === currentSlide ? 'text-[#1a3766]' : 'text-white'}`}>
                                  {tab.label}
                                </span>
                              </>
                            )}
                          </div>
                          {index === currentSlide && (
                            <motion.div
                              className="absolute inset-0 rounded-full ring-2 ring-white/60"
                              layoutId="activeRing"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                            />
                          )}
                        </motion.div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Content Section */}
            <div
              className="absolute bottom-0 left-0 right-0 w-full bg-white shadow-xl z-10
                h-[calc(100dvh-170px)] overflow-y-auto rounded-t-[2.5rem] -mt-8 touch-pan-y overscroll-contain"
              onPointerDown={(e) => {
                const target = e.target as HTMLElement;
                if (target.closest(".overflow-y-auto")) {
                  e.stopPropagation();
                }
              }}
              onScroll={(e) => {
                const target = e.currentTarget;
                const currentScrollTop = target.scrollTop;
                const scrollingDown = currentScrollTop > lastScrollTop;

                // محاسبه ارتفاع کل محتوا و ارتفاع قابل مشاهده
                const scrollHeight = target.scrollHeight;
                const clientHeight = target.clientHeight;

                // بررسی رسیدن به انتهای اسکرول (با تلرانس 20 پیکسل)
                const isAtBottom =
                  scrollHeight - (currentScrollTop + clientHeight) < 20;

                if (Math.abs(currentScrollTop - lastScrollTop) > 10) {
                  // نمایش دکمه‌ها در صورت اسکرول به بالا یا رسیدن به انتها
                  setShowButtons(!scrollingDown || isAtBottom);
                  setLastScrollTop(currentScrollTop);
                }

                // همیشه نمایش دکمه‌ها در انتها، حتی اگر کمتر از 10 پیکسل اسکرول شده باشد
                if (isAtBottom) {
                  setShowButtons(true);
                }
              }}
            >
              {/* Content Area */}
              <div className="px-3 pt-6 pb-20 text-sm">
                {/* Action Buttons */}
                <motion.div
                  className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20"
                  initial={{ y: 0, opacity: 1 }}
                  animate={{
                    y: showButtons ? 0 : 100,
                    opacity: showButtons ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                  }}
                >
                  <motion.button
                    className="w-12 h-12 bg-gradient-to-r from-[#1a3766] to-[#2c4f8f] rounded-full 
                      flex items-center justify-center shadow-lg relative group overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => console.log("Add new")}
                  >
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-[#264785] to-[#3a62a8] 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="relative z-10"
                    >
                      <path
                        d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
                        fill="white"
                      />
                    </svg>
                  </motion.button>
                  <motion.button
                    className="h-10 px-4 bg-white text-[#1a3766] rounded-full
                      flex items-center gap-2 group relative overflow-hidden"
                    initial={{ boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 10px 15px -3px rgba(26, 55, 102, 0.3)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => console.log("View details")}
                  >
                    {/* Border gradient animation */}
                    <div
                      className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-[#1a3766] via-[#264785] to-[#1a3766] opacity-80"
                      style={{
                        WebkitMaskImage:
                          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      }}
                    />

                    {/* Hover effect gradient */}
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-[#1a3766] via-[#264785] to-[#1a3766] 
                      opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-full"
                    />

                    {/* Button content */}
                    <div className="relative z-10 flex items-center gap-2">
                      <span className="font-semibold text-[13px]">
                        جزئیات بیشتر
                      </span>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="transition-transform duration-300 group-hover:rotate-12"
                      >
                        <path
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
                          fill="currentColor"
                        />
                        <path
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          d="M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm1 13h-2v-6h2v6zm0-8h-2V7h2v2z"
                          fill="currentColor"
                          fillOpacity="0.3"
                        />
                      </svg>
                    </div>

                    {/* Shine effect on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 duration-1000 transition-opacity">
                      <div className="absolute inset-0 rotate-180 overflow-hidden rounded-full">
                        <div
                          className="absolute -left-[100%] top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent transform 
                          group-hover:animate-[shine_1.5s_ease-in-out_infinite]"
                        />
                      </div>
                    </div>
                  </motion.button>

                  <style jsx global>{`
                    @keyframes shine {
                      0% {
                        transform: translateX(0);
                      }
                      100% {
                        transform: translateX(400%);
                      }
                    }
                  `}</style>
                </motion.div>

                {loading ? (
                  <div className="flex items-center justify-center py-10">
                    <div className="w-8 h-8 border-3 border-cyan-200 border-t-cyan-600 rounded-full animate-spin" />
                  </div>
                ) : (
                  <>
                    {tabs[currentSlide].id === "missions" && (
                      <div className="space-y-3">
                        <h3 className="text-base sm:text-lg font-bold text-[#1a3766]">
                          لیست مأموریت‌ها
                        </h3>
                        <div className="space-y-3">{
                          missions.map((mission) => (
                            <MissionCard key={mission.id} mission={mission} />
                          ))}
                        </div>
                      </div>
                    )}
                    {tabs[currentSlide].id === "leaves" && (
                      <div className="space-y-3">
                        <h3 className="text-base sm:text-lg font-bold text-[#1a3766]">
                          لیست مرخصی‌ها
                        </h3>
                        <div className="space-y-3">
                          {leaves.map((leave) => (
                            <LeaveCard 
                              key={leave.id} 
                              leave={leave} 
                              onDelete={handleDeleteLeave}
                              onCopy={handleCopyLeave}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    {tabs[currentSlide].id === "performance" && (
                      <div className="space-y-3">
                        <h3 className="text-base sm:text-lg font-bold text-[#1a3766]">
                          گزارش کارکرد
                        </h3>
                        <div className="space-y-3">
                          {performance.map((item) => (
                            <PerformanceCard key={item.id} performance={item} />
                          ))}
                        </div>
                      </div>
                    )}
                    {tabs[currentSlide].id === "charts" && (
                      <div className="space-y-6">
                        <h3 className="text-base sm:text-lg font-bold text-[#1a3766]">
                          دیاگرام‌ها
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Bar Chart */}
                          <div className="p-3 rounded-xl bg-gradient-to-b from-white to-slate-50 border border-slate-100 shadow-sm">
                            <h4 className="font-semibold mb-2 text-[#1a3766] text-xs sm:text-sm">
                              نمودار ستونی
                            </h4>
                            <Chart
                              options={chartsData.bar.options}
                              series={chartsData.bar.series}
                              type="bar"
                              height={220}
                            />
                          </div>
                          {/* Line Chart */}
                          <div className="p-3 rounded-xl bg-gradient-to-b from-white to-slate-50 border border-slate-100 shadow-sm">
                            <h4 className="font-semibold mb-2 text-[#1a3766] text-xs sm:text-sm">
                              نمودار خطی
                            </h4>
                            <Chart
                              options={chartsData.line.options}
                              series={chartsData.line.series}
                              type="line"
                              height={220}
                            />
                          </div>
                          {/* Area (Volume) Chart */}
                          <div className="p-3 rounded-xl bg-gradient-to-b from-white to-slate-50 border border-slate-100 shadow-sm">
                            <h4 className="font-semibold mb-2 text-[#1a3766] text-xs sm:text-sm">
                              نمودار حجمی
                            </h4>
                            <Chart
                              options={chartsData.area.options}
                              series={chartsData.area.series}
                              type="area"
                              height={220}
                            />
                          </div>
                          {/* Pie / Donut Chart */}
                          <div className="p-3 rounded-xl bg-gradient-to-b from-white to-slate-50 border border-slate-100 shadow-sm">
                            <h4 className="font-semibold mb-2 text-[#1a3766] text-xs sm:text-sm">
                              سهم‌بندی
                            </h4>
                            <Chart
                              options={chartsData.pie.options}
                              series={chartsData.pie.series}
                              type="donut"
                              height={240}
                            />
                          </div>
                          {/* Horizontal Bar */}
                          <div className="p-3 rounded-xl bg-gradient-to-b from-white to-slate-50 border border-slate-100 shadow-sm">
                            <h4 className="font-semibold mb-2 text-[#1a3766] text-xs sm:text-sm">
                              نمودار افقی
                            </h4>
                            <Chart
                              options={chartsData.horizontal.options}
                              series={chartsData.horizontal.series}
                              type="bar"
                              height={220}
                            />
                          </div>
                          {/* Radial Progress */}
                          <div className="p-3 rounded-xl bg-gradient-to-b from-white to-slate-50 border border-slate-100 shadow-sm flex flex-col items-center justify-center">
                            <h4 className="font-semibold mb-2 text-[#1a3766] text-xs sm:text-sm self-start">
                              پیشرفت کلی
                            </h4>
                            <Chart
                              options={chartsData.radial.options}
                              series={chartsData.radial.series}
                              type="radialBar"
                              height={240}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
