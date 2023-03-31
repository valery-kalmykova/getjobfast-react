import React from "react";
import styles from "./styles.module.css";
import { Card } from "primereact/card";
import { useSelector } from "../../services/hooks";

export const Resumes = ({ onClick }: any) => {
  const resumes = useSelector((state) => state.common.resumes);
  console.log(resumes);

  if (resumes.length === 0) {
    return null;
  }

  return resumes.map((item: any, index: any) => {
    const { id, title, checked } = item;

    return (
      <Card
        onClick={onClick}
        id={id}
        key={index}
        className={checked ? styles.cardChecked : styles.card}
      >
        {title}
      </Card>
    );
  });
};
