import { HTMLAttributes, ReactNode } from "react";
import { Link, LinkProps } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

//station component

interface Props {
  icon?: ReactNode;
  chevron?: boolean;
  disabled?: boolean;
}

interface InternalButtonProps
  extends Props,
    HTMLAttributes<HTMLButtonElement> {}

export const InternalButton = (props: InternalButtonProps) => {
  return <button {...render(props)} type="button" />;
};

interface InternalLinkProps extends Props, LinkProps {}
export const InternalLink = (props: InternalLinkProps) => {
  return props.disabled ? (
    <span {...render(props)} />
  ) : (
    <Link {...render(props)} />
  );
};
/* helpers */
const render = <T extends InternalLinkProps | InternalButtonProps>(
  props: T
) => {
  const { icon, chevron, className, children, disabled, ...attrs } = props;

  return {
    ...attrs,
    children: (
      <>
        <span>{icon}</span>
        {children}
        {chevron && (
          <span>
            <ChevronRightIcon style={{ fontSize: 16 }} />
          </span>
        )}
      </>
    ),
  };
};
