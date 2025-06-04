import * as React from "react";
import Badge from "./Badge.tsx";

type CardProps = {
  children?: React.ReactNode;
  title: string;
  badges?: string[];
  actions?: React.ReactNode;
  isForm?: boolean;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function Card({
  children = null,
  title,
  badges = [],
  actions = null,
  isForm = false,
  onSubmit = () => {},
}: CardProps) {
  return (
    <div className="card card-border bg-base-100 shadow-sm my-2">
      <CardBody isForm={isForm} onSubmit={onSubmit}>
        <h2 className="card-title">{title}</h2>
        {badges.length > 0 && (
          <div className={"flex flex-row flex-wrap gap-2"}>
            {badges.map((badge) => (
              <Badge key={badge} text={badge} />
            ))}
          </div>
        )}
        {children}
        {actions && <div className="card-actions">{actions}</div>}
      </CardBody>
    </div>
  );
}

function CardBody({
  children,
  isForm,
  onSubmit,
}: {
  children: React.ReactNode;
  isForm: boolean;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  if (isForm) {
    return (
      <form className="card-body" onSubmit={onSubmit}>
        {children}
      </form>
    );
  } else {
    return <div className="card-body">{children}</div>;
  }
}
