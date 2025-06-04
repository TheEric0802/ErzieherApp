type BadgeProps = {
  text: string;
};

export default function Badge({ text }: BadgeProps) {
  return <div className="badge badge-accent">{text}</div>;
}
