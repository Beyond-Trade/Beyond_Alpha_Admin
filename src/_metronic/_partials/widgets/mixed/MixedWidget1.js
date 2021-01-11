/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */

import React, { useEffect, useMemo } from "react";

import ApexCharts from "apexcharts";
import { Dropdown } from "react-bootstrap";
import { DropdownMenu2 } from "../../dropdowns";
import SVG from "react-inlinesvg";
import { TotalArtists } from "../AnalyticsComponents/Artists";
import { TotalAudios } from "../AnalyticsComponents/AudioSongs";
import { TotalPaidUsers } from "../AnalyticsComponents/PaidUsers";
import { TotalUnPaidUsers } from "../AnalyticsComponents/UnpaidUsers";
import { TotalUsers } from "../AnalyticsComponents/Users";
import { TotalVideos } from "../AnalyticsComponents/VideoSongs";
import objectPath from "object-path";
import { toAbsoluteUrl } from "../../../_helpers";
import { useHtmlClassService } from "../../../layout";

export function MixedWidget1({ className }) {
  const uiService = useHtmlClassService();

  const layoutProps = useMemo(() => {
    return {
      colorsGrayGray500: objectPath.get(
        uiService.config,
        "js.colors.gray.gray500"
      ),
      colorsGrayGray200: objectPath.get(
        uiService.config,
        "js.colors.gray.gray200"
      ),
      colorsGrayGray300: objectPath.get(
        uiService.config,
        "js.colors.gray.gray300"
      ),
      colorsThemeBaseDanger: objectPath.get(
        uiService.config,
        "js.colors.theme.base.danger"
      ),
      fontFamily: objectPath.get(uiService.config, "js.fontFamily"),
    };
  }, [uiService]);

  // useEffect(() => {
  //   const element = document.getElementById("kt_mixed_widget_1_chart");
  //   if (!element) {
  //     return;
  //   }

  //   const options = getChartOptions(layoutProps);

  //   const chart = new ApexCharts(element, options);
  //   chart.render();
  //   return function cleanUp() {
  //     chart.destroy();
  //   };
  // }, [layoutProps]);

  return (
    <div className={`card card-custom bg-gray-100 ${className}`}>
      {/* Header */}
      <div className="card-header border-0 bg-danger py-5">
        <h3 className="card-title font-weight-bolder text-white">Analytics</h3>
        {/* <div className="card-toolbar">
          <Dropdown className="dropdown-inline" drop="down" alignRight>
            <Dropdown.Toggle
              className="btn btn-transparent-white btn-sm font-weight-bolder dropdown-toggle px-5"
              variant="transparent"
              id="dropdown-toggle-top"
            >
              Export
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
              <DropdownMenu2 />
            </Dropdown.Menu>
          </Dropdown>
        </div> */}
      </div>
      {/* Body */}
      <div className="card-body p-0 position-relative overflow-hidden">
        {/* Chart */}
        <div
          id="kt_mixed_widget_1_chart"
          className="card-rounded-bottom bg-danger"
          style={{ height: "200px" }}
        ></div>

        {/* Stat */}
        <div className="card-spacer mt-n25">
          <div className="row m-0">
            <TotalUsers />
            <TotalPaidUsers />
          </div>
          <div className="row m-0">
            <TotalUnPaidUsers />
            <TotalArtists />
          </div>
          <div className="row m-0">
            <TotalVideos />
            <TotalAudios />
          </div>
        </div>

        {/* Resize */}
        <div className="resize-triggers">
          <div className="expand-trigger">
            <div style={{ width: "411px", height: "461px" }} />
          </div>
          <div className="contract-trigger" />
        </div>
      </div>
    </div>
  );
}

// function getChartOptions(layoutProps) {
//   const strokeColor = "#D13647";

//   const options = {
//     series: [
//       {
//         name: "Net Profit",
//         data: [30, 45, 32, 70, 40, 40, 40],
//       },
//     ],
//     chart: {
//       type: "area",
//       height: 200,
//       toolbar: {
//         show: false,
//       },
//       zoom: {
//         enabled: false,
//       },
//       sparkline: {
//         enabled: true,
//       },
//       dropShadow: {
//         enabled: true,
//         enabledOnSeries: undefined,
//         top: 5,
//         left: 0,
//         blur: 3,
//         color: strokeColor,
//         opacity: 0.5,
//       },
//     },
//     plotOptions: {},
//     legend: {
//       show: false,
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     fill: {
//       type: "solid",
//       opacity: 0,
//     },
//     stroke: {
//       curve: "smooth",
//       show: true,
//       width: 3,
//       colors: [strokeColor],
//     },
//     xaxis: {
//       categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
//       axisBorder: {
//         show: false,
//       },
//       axisTicks: {
//         show: false,
//       },
//       labels: {
//         show: false,
//         style: {
//           colors: layoutProps.colorsGrayGray500,
//           fontSize: "12px",
//           fontFamily: layoutProps.fontFamily,
//         },
//       },
//       crosshairs: {
//         show: false,
//         position: "front",
//         stroke: {
//           color: layoutProps.colorsGrayGray300,
//           width: 1,
//           dashArray: 3,
//         },
//       },
//     },
//     yaxis: {
//       min: 0,
//       max: 80,
//       labels: {
//         show: false,
//         style: {
//           colors: layoutProps.colorsGrayGray500,
//           fontSize: "12px",
//           fontFamily: layoutProps.fontFamily,
//         },
//       },
//     },
//     states: {
//       normal: {
//         filter: {
//           type: "none",
//           value: 0,
//         },
//       },
//       hover: {
//         filter: {
//           type: "none",
//           value: 0,
//         },
//       },
//       active: {
//         allowMultipleDataPointsSelection: false,
//         filter: {
//           type: "none",
//           value: 0,
//         },
//       },
//     },
//     tooltip: {
//       style: {
//         fontSize: "12px",
//         fontFamily: layoutProps.fontFamily,
//       },
//       y: {
//         formatter: function(val) {
//           return "$" + val + " thousands";
//         },
//       },
//       marker: {
//         show: false,
//       },
//     },
//     colors: ["transparent"],
//     markers: {
//       colors: layoutProps.colorsThemeBaseDanger,
//       strokeColor: [strokeColor],
//       strokeWidth: 3,
//     },
//   };
//   return options;
// }
