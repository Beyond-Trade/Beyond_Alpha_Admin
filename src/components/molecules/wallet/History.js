import React from "react";

function History() {
  return (
    <div className="px-8 xl:px-24 lg:px-24 mt-8 mb-8">
      <div className="w-full bg-customGray-100 rounded mr-8">
        <div className="bg-gray-300 rounded-t pl-2 pt-2">
          <h3 className="font-medium text-xs xxl:text-lg text-gray-600">
            EXCHANGE HISTORY
          </h3>
        </div>
        <table width="100%">
          <tr className="bg-gray-300 text-xxs xxl:text-base text-left text-gray-600 font-medium">
            <td className="w-1/5 pl-2 flex items-center">
              ASSETS
              <img
                src="assets/Icons/up-down-arrow.svg"
                alt="img"
                className="ml-1 h-2"
              />
            </td>
            <td className="w-1/5">
              <div className="flex items-center">
                DESCRIPTION
                <img
                  src="assets/Icons/up-down-arrow.svg"
                  alt="img"
                  className="ml-1 h-2"
                />
              </div>
            </td>
            <td className="w-1/5">
              <div className="flex items-center">
                TOTAL
                <img
                  src="assets/Icons/up-down-arrow.svg"
                  alt="img"
                  className="ml-1 h-2"
                />
              </div>
            </td>
            <td className="w-1/5">
              <div className="flex items-center">
                USD VALUE
                <img
                  src="assets/Icons/up-down-arrow.svg"
                  alt="img"
                  className="ml-1 h-2"
                />
              </div>
            </td>
            <td className="w-1/5">
              <div className="flex items-center">ACTION</div>
            </td>
          </tr>
          <tbody></tbody>
        </table>
        <div className="py-20 flex justify-center items-center">
          <h6 className="text-gray-600 font-normal text-xs xxl:text-base">
            No exchange history found for associated wallet
          </h6>
        </div>
      </div>
    </div>
  );
}

export default History;
