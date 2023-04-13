import { useOne } from "@pankod/refine-core";
import { useParams } from "@pankod/refine-react-router-v6";
import { IJob, IRole, IUseCase } from "interfaces";
import { useEffect } from "react";
import { Resource } from "services/enums";

export const UseCaseMatrixTable = () => {
  const { itemId } = useParams();
  const queryResult = useOne<IUseCase>({
    resource: Resource.USE_CASE,
    id: Number(itemId),
  });
  const useCaseData = queryResult?.data?.data;

  useEffect(() => {
    const rows = useCaseData?.jobs;
    const columns = useCaseData?.roles;

    const tableHead = document.querySelector("table thead tr");
    const tableBody = document.querySelector("table tbody");

    // Populate the table header with role names
    columns?.forEach((column: IRole) => {
      const th = document.createElement("th");
      th.style.border = "1px solid black";
      th.textContent = column?.name;
      tableHead?.appendChild(th);
    });

    // Populate the table body with names and checkboxes
    rows?.forEach((row: IJob) => {
      const tr = document.createElement("tr");
      const tdName = document.createElement("td");
      tdName.style.border = "1px solid black";
      tdName.textContent = row?.name;
      tr.appendChild(tdName);

      columns?.forEach((column: IRole) => {
        const tdRole = document.createElement("td");
        tdRole.style.border = "1px solid black";
        tdRole.style.textAlign = "center";
        const icon = document.createElement("span");
        icon.innerText = row?.role_ids.includes(column?.id) ? "✓" : "✗";
        icon.style.color = row?.role_ids.includes(column?.id) ? "green" : "red";
        tdRole.appendChild(icon);
        tr.appendChild(tdRole);
      });
      tableBody?.appendChild(tr);
    });
  }, [useCaseData]);

  return (
    <>
      <h2>
        <strong>{useCaseData?.name}</strong>
      </h2>
      {useCaseData && useCaseData?.jobs.length > 0 && useCaseData?.roles.length > 0 ? (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  border: "1px solid black",
                }}
              >
                Job Name
              </th>
              {/* <!-- Roles will be populated here --> */}
            </tr>
          </thead>
          <tbody>{/* <!-- Table data will be populated here --> */}</tbody>
        </table>
      ) : (
        <label>No data</label>
      )}
    </>
  );
};
