import i18n from "./i18n";

test("uses Polish PMO portfolio content", () => {
  expect(i18n.t("greeting")).toMatch(/student Inżynierii Zarządzania/i);
  expect(i18n.t("sferaTitle")).toBe("Projekt SFERA");
});

test("switches the dictionary to English", async () => {
  await i18n.changeLanguage("en");
  expect(i18n.t("skills")).toBe("Skills");
  expect(i18n.t("homePage")).toBe("Home");
  await i18n.changeLanguage("pl");
});
