import { Button } from "../ui";

type Item = {
  label: string;
  description: React.ReactNode;
};

interface Props {
  title: string;
  items: Item[];
  onDelete: (index: number) => void;
}

const SkillList: React.FC<Props> = ({ title, items, onDelete }) => {
  return (
    <div className="mb-6 border-t border-gray-200 pt-6" dir="rtl">
      <h2 className="font-bold  mb-3 text-gray-800">{title}</h2>

      {items.length === 0 ? (
        <p className="text-sm text-gray-500 italic">هیچ آیتمی ثبت نشده است</p>
      ) : (
        <ul className="space-y-3">
          {items.map((item, idx) => (
            <li
              key={idx}
              className="bg-white border border-gray-300 rounded-lg p-4 flex justify-between items-center shadow-sm hover:shadow-md transition"
            >
              <div>
                <p className="font-semibold text-gray-900">{item.label}</p>
                {item.description && (
                  <p className="text-sm text-gray-600 mt-1">
                    {item.description}
                  </p>
                )}
              </div>

              <Button
                onClick={() => onDelete(idx)}
                variant="destructive"
                className="min-w-[70px]"
              >
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
