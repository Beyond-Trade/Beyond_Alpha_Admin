import React, { useMemo } from "react";

import { Link } from "react-router-dom";
import { useHtmlClassService } from "../../_core/MetronicLayout";

export function Footer() {
  const today = new Date().getFullYear();
  const uiService = useHtmlClassService();

  const layoutProps = useMemo(() => {
    return {
      footerClasses: uiService.getClasses("footer", true),
      footerContainerClasses: uiService.getClasses("footer_container", true),
    };
  }, [uiService]);

  return (
    <div
      className={`footer bg-white py-4 d-flex flex-lg-column  ${layoutProps.footerClasses}`}
      id="kt_footer"
    >
      <div
        className={`${layoutProps.footerContainerClasses} d-flex flex-column flex-md-row align-items-center justify-content-between`}
      >
        <div className="text-dark order-2 order-md-1">
          <span className="text-muted font-weight-bold mr-2">
            {today.toString()}
          </span>{" "}
          &copy; <Link to="#">Beyond</Link>
        </div>
        {/* <div className="nav nav-dark order-1 order-md-2">
          <Link to="#">About</Link>
          <Link to="#" className="mx-5">
            Team
          </Link>
          <Link to="#">Contact</Link>
        </div> */}
      </div>
    </div>
  );
}
