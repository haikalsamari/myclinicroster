export default function customIdentifier(staffList: {id: number}[]): number {
    if (staffList.length === 0) return 1;

    const latestId = Math.max(...staffList.map((staff) => staff.id));
    console.log("Latest ID: ", latestId + 1);
    return latestId + 1;
}