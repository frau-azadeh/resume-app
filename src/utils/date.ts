import dayjs from "dayjs";
import jalaliday from "jalaliday";

dayjs.extend(jalaliday);

export const todayJalali = () => dayjs().calendar("jalali");
export default dayjs;
