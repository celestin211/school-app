(self["webpackChunkschool_app"] = self["webpackChunkschool_app"] || []).push([["bar-chart"],{

/***/ "./assets/js/chart/bar-chart.js":
/*!**************************************!*\
  !*** ./assets/js/chart/bar-chart.js ***!
  \**************************************/
/***/ (() => {

// Bar chart
var ctx5 = document.getElementById("bar-chart").getContext("2d");
new Chart(ctx5, {
  type: "bar",
  data: {
    labels: ['16-20', '21-25', '26-30', '31-36', '36-42', '42+'],
    datasets: [{
      label: "Sales by age",
      weight: 5,
      borderWidth: 0,
      borderRadius: 4,
      backgroundColor: '#3A416F',
      data: [15, 20, 12, 60, 20, 15],
      fill: false,
      maxBarThickness: 35
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        grid: {
          drawBorder: false,
          display: true,
          drawOnChartArea: true,
          drawTicks: false,
          borderDash: [5, 5]
        },
        ticks: {
          display: true,
          padding: 10,
          color: '#9ca2b7'
        }
      },
      x: {
        grid: {
          drawBorder: false,
          display: false,
          drawOnChartArea: true,
          drawTicks: true
        },
        ticks: {
          display: true,
          color: '#9ca2b7',
          padding: 10
        }
      }
    }
  }
});

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./assets/js/chart/bar-chart.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFyLWNoYXJ0LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQSxJQUFJQSxJQUFJLEdBQUdDLFFBQVEsQ0FBQ0MsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDQyxVQUFVLENBQUMsSUFBSSxDQUFDO0FBRWhFLElBQUlDLEtBQUssQ0FBQ0osSUFBSSxFQUFFO0VBQ2ZLLElBQUksRUFBRSxLQUFLO0VBQ1hDLElBQUksRUFBRTtJQUNMQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQztJQUM1REMsUUFBUSxFQUFFLENBQUM7TUFDVkMsS0FBSyxFQUFFLGNBQWM7TUFDckJDLE1BQU0sRUFBRSxDQUFDO01BQ1RDLFdBQVcsRUFBRSxDQUFDO01BQ2RDLFlBQVksRUFBRSxDQUFDO01BQ2ZDLGVBQWUsRUFBRSxTQUFTO01BQzFCUCxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztNQUM5QlEsSUFBSSxFQUFFLEtBQUs7TUFDWEMsZUFBZSxFQUFFO0lBQ2xCLENBQUM7RUFDRixDQUFDO0VBQ0RDLE9BQU8sRUFBRTtJQUNSQyxVQUFVLEVBQUUsSUFBSTtJQUNoQkMsbUJBQW1CLEVBQUUsS0FBSztJQUMxQkMsT0FBTyxFQUFFO01BQ1JDLE1BQU0sRUFBRTtRQUNQQyxPQUFPLEVBQUU7TUFDVjtJQUNELENBQUM7SUFDREMsTUFBTSxFQUFFO01BQ1BDLENBQUMsRUFBRTtRQUNGQyxJQUFJLEVBQUU7VUFDTEMsVUFBVSxFQUFFLEtBQUs7VUFDakJKLE9BQU8sRUFBRSxJQUFJO1VBQ2JLLGVBQWUsRUFBRSxJQUFJO1VBQ3JCQyxTQUFTLEVBQUUsS0FBSztVQUNoQkMsVUFBVSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDbEIsQ0FBQztRQUNEQyxLQUFLLEVBQUU7VUFDTlIsT0FBTyxFQUFFLElBQUk7VUFDYlMsT0FBTyxFQUFFLEVBQUU7VUFDWEMsS0FBSyxFQUFFO1FBQ1I7TUFDRCxDQUFDO01BQ0RDLENBQUMsRUFBRTtRQUNGUixJQUFJLEVBQUU7VUFDTEMsVUFBVSxFQUFFLEtBQUs7VUFDakJKLE9BQU8sRUFBRSxLQUFLO1VBQ2RLLGVBQWUsRUFBRSxJQUFJO1VBQ3JCQyxTQUFTLEVBQUU7UUFDWixDQUFDO1FBQ0RFLEtBQUssRUFBRTtVQUNOUixPQUFPLEVBQUUsSUFBSTtVQUNiVSxLQUFLLEVBQUUsU0FBUztVQUNoQkQsT0FBTyxFQUFFO1FBQ1Y7TUFDRDtJQUNEO0VBQ0Q7QUFDRCxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zY2hvb2wtYXBwLy4vYXNzZXRzL2pzL2NoYXJ0L2Jhci1jaGFydC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBCYXIgY2hhcnRcclxudmFyIGN0eDUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJhci1jaGFydFwiKS5nZXRDb250ZXh0KFwiMmRcIik7XHJcblxyXG5uZXcgQ2hhcnQoY3R4NSwge1xyXG5cdHR5cGU6IFwiYmFyXCIsXHJcblx0ZGF0YToge1xyXG5cdFx0bGFiZWxzOiBbJzE2LTIwJywgJzIxLTI1JywgJzI2LTMwJywgJzMxLTM2JywgJzM2LTQyJywgJzQyKyddLFxyXG5cdFx0ZGF0YXNldHM6IFt7XHJcblx0XHRcdGxhYmVsOiBcIlNhbGVzIGJ5IGFnZVwiLFxyXG5cdFx0XHR3ZWlnaHQ6IDUsXHJcblx0XHRcdGJvcmRlcldpZHRoOiAwLFxyXG5cdFx0XHRib3JkZXJSYWRpdXM6IDQsXHJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogJyMzQTQxNkYnLFxyXG5cdFx0XHRkYXRhOiBbMTUsIDIwLCAxMiwgNjAsIDIwLCAxNV0sXHJcblx0XHRcdGZpbGw6IGZhbHNlLFxyXG5cdFx0XHRtYXhCYXJUaGlja25lc3M6IDM1XHJcblx0XHR9XSxcclxuXHR9LFxyXG5cdG9wdGlvbnM6IHtcclxuXHRcdHJlc3BvbnNpdmU6IHRydWUsXHJcblx0XHRtYWludGFpbkFzcGVjdFJhdGlvOiBmYWxzZSxcclxuXHRcdHBsdWdpbnM6IHtcclxuXHRcdFx0bGVnZW5kOiB7XHJcblx0XHRcdFx0ZGlzcGxheTogZmFsc2UsXHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRzY2FsZXM6IHtcclxuXHRcdFx0eToge1xyXG5cdFx0XHRcdGdyaWQ6IHtcclxuXHRcdFx0XHRcdGRyYXdCb3JkZXI6IGZhbHNlLFxyXG5cdFx0XHRcdFx0ZGlzcGxheTogdHJ1ZSxcclxuXHRcdFx0XHRcdGRyYXdPbkNoYXJ0QXJlYTogdHJ1ZSxcclxuXHRcdFx0XHRcdGRyYXdUaWNrczogZmFsc2UsXHJcblx0XHRcdFx0XHRib3JkZXJEYXNoOiBbNSwgNV1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHRpY2tzOiB7XHJcblx0XHRcdFx0XHRkaXNwbGF5OiB0cnVlLFxyXG5cdFx0XHRcdFx0cGFkZGluZzogMTAsXHJcblx0XHRcdFx0XHRjb2xvcjogJyM5Y2EyYjcnXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0XHR4OiB7XHJcblx0XHRcdFx0Z3JpZDoge1xyXG5cdFx0XHRcdFx0ZHJhd0JvcmRlcjogZmFsc2UsXHJcblx0XHRcdFx0XHRkaXNwbGF5OiBmYWxzZSxcclxuXHRcdFx0XHRcdGRyYXdPbkNoYXJ0QXJlYTogdHJ1ZSxcclxuXHRcdFx0XHRcdGRyYXdUaWNrczogdHJ1ZSxcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHRpY2tzOiB7XHJcblx0XHRcdFx0XHRkaXNwbGF5OiB0cnVlLFxyXG5cdFx0XHRcdFx0Y29sb3I6ICcjOWNhMmI3JyxcclxuXHRcdFx0XHRcdHBhZGRpbmc6IDEwXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0fSxcclxuXHR9LFxyXG59KTtcclxuIl0sIm5hbWVzIjpbImN0eDUiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiZ2V0Q29udGV4dCIsIkNoYXJ0IiwidHlwZSIsImRhdGEiLCJsYWJlbHMiLCJkYXRhc2V0cyIsImxhYmVsIiwid2VpZ2h0IiwiYm9yZGVyV2lkdGgiLCJib3JkZXJSYWRpdXMiLCJiYWNrZ3JvdW5kQ29sb3IiLCJmaWxsIiwibWF4QmFyVGhpY2tuZXNzIiwib3B0aW9ucyIsInJlc3BvbnNpdmUiLCJtYWludGFpbkFzcGVjdFJhdGlvIiwicGx1Z2lucyIsImxlZ2VuZCIsImRpc3BsYXkiLCJzY2FsZXMiLCJ5IiwiZ3JpZCIsImRyYXdCb3JkZXIiLCJkcmF3T25DaGFydEFyZWEiLCJkcmF3VGlja3MiLCJib3JkZXJEYXNoIiwidGlja3MiLCJwYWRkaW5nIiwiY29sb3IiLCJ4Il0sInNvdXJjZVJvb3QiOiIifQ==