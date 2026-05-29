"use client";

import "@/i18n";
import { useTranslation } from "react-i18next";
import { ProductsPlaceholder, BiographyQuestions } from "./styled";

export default function TabBiography() {
  const { t } = useTranslation();

  const questionKeys: string[] = [];

  const questions = questionKeys.map((key) => t(key)).filter(Boolean);

  const allEmpty = questions.every(
    (q) => typeof q !== "string" || q.trim() === "" || q.startsWith("biography.q")
  );

  return (
    <BiographyQuestions>
      {allEmpty ? (
        <ProductsPlaceholder>{t("biography.noInfo")}</ProductsPlaceholder>
      ) : (
        questions.map((q, idx) => (
          <ProductsPlaceholder key={questionKeys[idx]}>{q}</ProductsPlaceholder>
        ))
      )}
    </BiographyQuestions>
  );
}