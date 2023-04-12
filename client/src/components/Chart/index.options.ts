import { SubOption } from "./index.types";

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
