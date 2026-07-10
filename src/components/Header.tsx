type Level = "h1" | "h2" | "h3" | "h4" | "h5";
interface HeaderType {
  level: Level;
  title: string;
}
export const Header = ({ level, title }: HeaderType) => {
  const Tag = level;
  return <Tag>{title}</Tag>;
};
