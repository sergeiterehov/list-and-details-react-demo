import { LinkProps } from "@mui/material/Link/Link";
import { forwardRef } from "react";
import { Link } from "react-router-dom";

const ReactLink = forwardRef<
  HTMLAnchorElement,
  LinkProps
>(function HrefLink({ href, ...props }, ref) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <Link {...(props as any)} ref={ref} to={href || ""} />;
});

export default ReactLink;
