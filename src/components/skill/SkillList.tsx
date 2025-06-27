import { Button } from "../ui";

type Item = {
  label: string;
  description: React.ReactNode; // یا JSX.Element | string
};

interface Props {
  title: string;
  items: Item[];
  onDelete: (index: number) => void;
}

const SkillList: React.FC<Props> = ({ title, items, onDelete }) => {
  return (
    <div className="mb-6">
      <h2 className="font-bold text-lg mb-2">{title}</h2>
      {items.length === 0 ? (
        <p className="text-sm text-gray-500">هیچ آیتمی ثبت نشده است</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item, idx) => (
            <li
              key={idx}
              className="border p-3 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{item.label}</p>
                {item.description && (
                  <p className="text-sm text-gray-500">{item.description}</p>
                )}
              </div>
              <Button onClick={() => onDelete(idx)} variant="destructive">
                حذف
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SkillList;
