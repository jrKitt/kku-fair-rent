// KKU faculties with an approximate campus zone used for travel estimation.
// zone maps roughly to a side of campus so we can estimate travel time from a dorm.

export interface Faculty {
  id: string;
  name: string;
  zone: "north" | "central" | "south" | "east" | "med";
}

export const FACULTIES: Faculty[] = [
  { id: "eng", name: "วิศวกรรมศาสตร์", zone: "central" },
  { id: "sci", name: "วิทยาศาสตร์", zone: "central" },
  { id: "med", name: "แพทยศาสตร์", zone: "med" },
  { id: "nurse", name: "พยาบาลศาสตร์", zone: "med" },
  { id: "pharm", name: "เภสัชศาสตร์", zone: "med" },
  { id: "dent", name: "ทันตแพทยศาสตร์", zone: "med" },
  { id: "vet", name: "สัตวแพทยศาสตร์", zone: "south" },
  { id: "agri", name: "เกษตรศาสตร์", zone: "south" },
  { id: "econ", name: "เศรษฐศาสตร์", zone: "north" },
  { id: "ba", name: "บริหารธุรกิจและการบัญชี", zone: "north" },
  { id: "hum", name: "มนุษยศาสตร์และสังคมศาสตร์", zone: "north" },
  { id: "edu", name: "ศึกษาศาสตร์", zone: "east" },
  { id: "law", name: "นิติศาสตร์", zone: "north" },
  { id: "arch", name: "สถาปัตยกรรมศาสตร์", zone: "central" },
  { id: "publichealth", name: "สาธารณสุขศาสตร์", zone: "med" },
  { id: "it", name: "เทคโนโลยี", zone: "south" },
  { id: "fineart", name: "ศิลปกรรมศาสตร์", zone: "east" },
  { id: "assoc", name: "สหวิทยาการ", zone: "east" },
];

export function facultyById(id: string): Faculty | undefined {
  return FACULTIES.find((f) => f.id === id);
}
