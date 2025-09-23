import type { ChartData } from '../types';

export const getChartsData = (): ChartData => {
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
};
