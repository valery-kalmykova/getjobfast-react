import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { ProgressSpinner } from 'primereact/progressspinner';

export default function Layout() {
  return (
    <>
      <Suspense fallback={<ProgressSpinner />}>
        <Outlet />
      </Suspense>
    </>
  );
}