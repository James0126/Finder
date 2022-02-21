import { Link } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";

const Breadcrumb = () => {
  const breadcrumb = useBreadcrumbs();

  return (
    <div>
      {breadcrumb.map(({ breadcrumb, match }) => {
        return (
          <Link to={match.pathname} key={match.pathname}>
            {" "}
            {breadcrumb} /
          </Link>
        );
      })}
    </div>
  );
};
export default Breadcrumb;
