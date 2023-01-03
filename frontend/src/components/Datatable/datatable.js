import React, { useState, useContext } from "react";
import styles from "./datatable.module.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { InputNumber } from 'primereact/inputnumber';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { VacanciesContext } from '../../utils/context';

export const DatatableVacancies = () => {
  const [vacancies, setVacancies] = useContext(VacanciesContext);
  const [selectedVacancies, setSelectedVacancies] = useState(null);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    'has_test': { value: null, matchMode: FilterMatchMode.EQUALS },
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

  const salaryBodyTemplate = (rowData) => {    
    if (rowData.salary !== null && rowData.salary.from !== null) {      
      return (
        <React.Fragment>
          <span>{rowData.salary.from.toLocaleString()}</span>
          <span>&nbsp;{rowData.salary.currency !== 'RUR' ? rowData.salary.currency : ''}</span>
        </React.Fragment>        
      )
    } else {
      return '-';
    };
  }

  const testBodyTemplate = (rowData) => {    
    if (rowData.has_test !== false) {      
      return (
        <React.Fragment>
          <i className="pi pi-user-edit"></i>
        </React.Fragment>        
      )
    } else {
      return '';
    };
  }

  const testFilterTemplate = (options) => {
    return <TriStateCheckbox value={options.value} onChange={(e) => options.filterCallback(e.value)} />
}

  const rowExpansionTemplate = (rowData) => {
    return (
      <div className={styles.expandContainer}>
        <h4>Обязанности:</h4>
        <p>{rowData.snippet.responsibility}</p>
        <h4>Требования:</h4>
        <p>{rowData.snippet.requirement}</p>
        <h4>График работы:</h4>
        <p>{rowData.schedule.name}</p>
        { rowData.has_test &&
        <>
          <h4>Пройти тест на hh.ru:</h4>
          <a href={rowData.has_test} target="_blank" rel="noreferrer">{rowData.has_test}</a> 
        </> }
      </div>
    );
  }

  const allowExpansion = (rowData) => {
    return rowData.name.length > 0;
  };

  return (
    <DataTable
      value={vacancies}
      paginator
      rows={10}
      rowsPerPageOptions={[10, 25, 50, 200]}
      header={header}
      filters={filters}
      expandedRows={expandedRows}
      onRowToggle={(e) => setExpandedRows(e.data)}
      rowExpansionTemplate={rowExpansionTemplate}
      dataKey="id"
      selectionMode="checkbox"
      selection={selectedVacancies}
      onSelectionChange={e => setSelectedVacancies(e.value)}
    >
      <Column
        selectionMode="multiple"
        selectionAriaLabel="name"
        headerStyle={{ width: "3em" }}
      ></Column>
      <Column field="name" header="Вакансия" sortable></Column>
      <Column field="employer.name" header="Работодатель" sortable></Column>
      <Column field="salary.from" header="Зарплата от" dataType="numeric" body={salaryBodyTemplate} sortable></Column>     
      <Column field="has_test" header="С тестом" body={testBodyTemplate} className={styles.textCenter} filter filterElement={testFilterTemplate}></Column>
      <Column expander={allowExpansion} style={{ width: '3em' }} />
    </DataTable>
  );
};