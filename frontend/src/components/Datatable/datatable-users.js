import React, { useState } from "react";
import styles from "./datatable.module.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";

export const DatatableUsers = ({ users }) => {
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [expandedRows, setExpandedRows] = useState(null);

  const renderHeader = () => {
    return (
      <div className={styles.headerFlex}>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Поиск"
          />
        </span>
      </div>
    );
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const header = renderHeader();

  const nameBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>
          {rowData.first_name} {rowData.middle_name} {rowData.last_name}
        </span>
      </React.Fragment>
    );
  };

  const experienceBodyTemplate = (rowData) => {
    const totalMonths = rowData.total_experience_months;
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths - years * 12;
    return (
      <React.Fragment>
        <span>
          {years} лет {months} мес.
        </span>
      </React.Fragment>
    );
  };

  const rowExpansionTemplate = (rowData) => {
    const experiense = rowData.experience;
    return (
      <div className={styles.expandContainer}>
        {experiense.map((item) => {
          return (
            <div>
              <h4>Период работы:</h4>
              <p>
                {item.start} - {item.end === null ? "до н.в." : item.end}
              </p>
              <h4>Компания:</h4>
              <p>{item.company}</p>
              <h4>Должность</h4>
              <p>{item.position}</p>
              <h4>Обязанности</h4>
              <p>{item.description}</p>
            </div>
          );
        })}
      </div>
    );
  };

  const allowExpansion = (rowData) => {
    return rowData.email.length > 0;
  };

  if (!users) return null;

  return (
    <DataTable
      value={users}
      paginator
      rows={100}
      rowsPerPageOptions={[100, 200]}
      header={header}
      filters={filters}
      expandedRows={expandedRows}
      onRowToggle={(e) => setExpandedRows(e.data)}
      rowExpansionTemplate={rowExpansionTemplate}
      dataKey="id"
      selectionPageOnly
      style={{ width: "100%" }}
    >
      <Column headerStyle={{ width: "3em" }}></Column>
      <Column header="Пользователь" sortable body={nameBodyTemplate}></Column>
      <Column field="title" header="Желаемая должность" sortable></Column>
      <Column
        header="Опыт, всего"
        sortable
        body={experienceBodyTemplate}
      ></Column>
      <Column field="phone" header="Телефон" sortable></Column>
      <Column field="email" header="Email" sortable></Column>
      <Column field="role" header="Роль" sortable></Column>
      <Column expander={allowExpansion} style={{ width: "3em" }} />
    </DataTable>
  );
};
