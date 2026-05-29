"use client";

import "@/i18n";
import { useTranslation } from "react-i18next";
import { ProductsPlaceholder } from "./styled";

export default function TabProducts() {
  const { t } = useTranslation();

  return (
    <ProductsPlaceholder>{t("products.loading")}</ProductsPlaceholder>
  );
}