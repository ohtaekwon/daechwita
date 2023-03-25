import { chartType, SubOption } from "./index.types";

export const barOption = {
  type: "bar" as chartType,
  series: [
    {
      name: "서류 전형",
      data: [30],
    },
    {
      name: "면접 전형(1차)",
      data: [6],
    },
    {
      name: "면접 전형(2차)",
      data: [3],
    },
    {
      name: "최종 발표",
      data: [2],
      //  41, 36, 26, 45, 48, 52, 53, 41
    },
  ],
  options: {
    title: {
      text: "나의 입사 지원 현황",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["2023 상반기 (1월 ~ 6월)"],
    },
    yaxis: {
      title: {
        text: "나의 지원 수",
        rotate: 360,
        style: {
          color: "#18181b",
          fontSize: "1rem",
          cssClass: "apexcharts-yaxis-label",
        },
      },

      crosshairs: {
        position: "back",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val: any) {
          console.log("val", val);
          return val + "개";
        },
      },
    },
  },
};

export const treemapOptions = {
  type: "treemap" as chartType,
  series: [
    {
      data: [
        {
          x: "자기소개",
          y: 218,
        },
        {
          x: "장단점",
          y: 149,
        },
        {
          x: "지원동기",
          y: 184,
        },
        {
          x: "성장과정",
          y: 55,
        },
        {
          x: "갈등 해결",
          y: 84,
        },
        {
          x: "창의적 문제 해결",
          y: 31,
        },
        {
          x: "성격의 장단점",
          y: 70,
        },
        {
          x: "목표 달성",
          y: 30,
        },
        {
          x: "프로젝트 경험",
          y: 44,
        },
        {
          x: "협업의 경험",
          y: 68,
        },
      ],
    },
  ],
  options: {
    title: {
      text: "가장 많이 쓴 자소서 유형",
    },
    plotOptions: {
      treemap: {
        distributed: true,
        enableShades: false,
      },
    },
    dataLabels: {
      enabled: true,
    },
    legend: {
      show: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: [
        // "#3B93A5",
        // "#F7B844",
        // "#ADD8C7",
        // "#EC3C65",
        // "#CDD7B6",
        // "#C1F666",
        // "#D43F97",
        // "#1E5D8C",
        // "#421243",
        // "#7F94B0",
        // "#EF6537",
        // "#C0ADDB",
      ],
    },
  },
};

export const donutOptions = {
  type: "donut" as chartType,
  series: [69.1, 100 - 69.1],
  options: {
    title: {
      text: "자기소개서 작성 현황",
    },
    dataLabels: {
      enabled: true,
    },
    plotOptions: {
      pie: {
        dataLabels: {
          offset: 1,
        },
      },
      donut: {
        size: "500px",
        label: {
          name: {
            show: true,
            fontSize: "1.2rem",
            fontWeight: 700,
            color: "red",
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            show: false,
          },
        },
      },
    ],
    stroke: {
      show: true,
      colors: ["transparent"],
    },
    labels: ["자기소개서 완성", "임시 글"],
  },
};

export const allOptions = {
  treemapOptions: ({ text }: SubOption) => {
    return {
      title: {
        text: text,
        style: {
          fontSize: "20px",
          fontWeight: "bold",
        },
      },

      plotOptions: {
        treemap: {
          distributed: true,
          enableShades: false,
        },
      },
      dataLabels: {
        enabled: true,
      },
      legend: {
        show: false,
      },
      stroke: {
        show: true,
        width: 2,
      },
      colors: [
        "#3B93A5",
        "#F7B844",
        "#56b891",
        "#EC3C65",
        "#778f40",
        "#3b9feb",
        "#D43F97",
        "#1E5D8C",
        "#421243",
        "#133561",
        "#EF6537",
        "#9160d6",
      ],
    };
  },
  donutOptions: ({ text, label }: SubOption) => {
    return {
      title: {
        text: text,
        style: {
          fontSize: "20px",
          fontWeight: "bold",
        },
      },
      dataLabels: {
        enabled: true,
      },
      plotOptions: {
        pie: {
          dataLabels: {
            offset: 1,
          },
        },
        donut: {
          size: "500px",
          label: {
            name: {
              show: true,
              fontSize: "1.2rem",
              fontWeight: 700,
            },
          },
        },
        colors: ["#0591fa", "#e81c3a"],
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              show: false,
              offsetY: -5,
            },
          },
        },
      ],
      stroke: {
        show: true,
        colors: ["transparent"],
      },
      labels: label,
    };
  },
  barOption: ({ text, categories }: SubOption) => {
    return {
      title: {
        text: text,
        style: {
          fontSize: "20px",
          fontWeight: "bold",
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: categories,
      },
      yaxis: {
        title: {
          text: "나의 지원 수",
          rotate: -90,
          offsetX: 0,
          offsetY: 0,
          style: {
            color: "#18181b",
            fontSize: "1rem",
            cssClass: "apexcharts-yaxis-label",
          },
        },

        crosshairs: {
          position: "back",
        },
      },
      fill: {
        opacity: 1,
      },
      colors: [
        "#3B93A5",
        "#F7B844",
        "#ADD8C7",
        "#EC3C65",
        "#CDD7B6",
        "#C1F666",
        "#D43F97",
        "#1E5D8C",
        "#421243",
        "#7F94B0",
        "#EF6537",
        "#C0ADDB",
      ],
      tooltip: {
        y: {
          formatter: function (val: any) {
            // () => location.replace("/schedules");
            // /schedules
            return val + "개";
          },
        },
      },
    };
  },
  polarAreaOption: ({ text, label }: SubOption) => {
    return {
      title: {
        text: text,
        style: {
          fontSize: "20px",
          fontWeight: "bold",
        },
      },
      stroke: {
        colors: ["#fff"],
      },
      labels: label,

      fill: {
        opacity: 0.8,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
      colors: [
        "#3B93A5",
        "#F7B844",
        "#56b891",
        "#EC3C65",
        "#778f40",
        "#3b9feb",
        "#D43F97",
        "#1E5D8C",
        "#421243",
        "#133561",
        "#EF6537",
        "#9160d6",
      ],
    };
  },
};
