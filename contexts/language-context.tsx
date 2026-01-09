"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

type Language = "en" | "es"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: typeof translations.en
}

const translations = {
  en: {
    // Navigation & Sections
    dashboard: "Dashboard",
    employers: "Employers",
    certifications: "Certifications",
    staffAgent: "Staff Agent",
    calendar: "Calendar",
    messages: "Messages",

    // Employers Section
    companies: "Companies",
    manageEmployers: "Manage your employers",
    searchEmployers: "Search employers...",
    addEmployer: "Add Employer",
    addEmployerTitle: "Add New Employer",
    addEmployerDescription: "Fill in the employer details and send them an invitation to join.",
    companyName: "Company Name",
    companyNamePlaceholder: "Enter company name",
    primaryContact: "Primary Contact",
    primaryContactPlaceholder: "Enter primary contact name",
    emailAddress: "Email Address",
    email: "Email",
    emailPlaceholder: "Enter email address",
    phone: "Phone",
    phonePlaceholder: "Enter phone number",
    invitationMessage: "Invitation Message",
    sendInvitation: "Send Invitation",

    // Table Headers
    id: "ID",
    location: "Location",
    status: "Status",
    caseManager: "Case Manager",
    actions: "Actions",
    viewDetails: "View Details",
    edit: "Edit",
    delete: "Delete",

    // Pagination
    showing: "Showing",
    to: "to",
    of: "of",
    records: "records",
    previous: "Previous",
    next: "Next",

    // Certifications Section
    certificationsCount: (count: number) => `${count} Certifications`,
    kanbanView: "Kanban View",
    listView: "List View",
    addCertification: "Add Certification",
    prevailingWageRate: "Prevailing Wage Rate",
    step1: "Step 1",
    step2: "Step 2",
    step3: "Step 3",
    laborCertification: "Labor Certification",
    i129Petition: "I-129 Petition",

    // Certification Form
    newH2Certification: "New H-2 Certification",
    certificationDescription: "Create a new H-2A or H-2B labor certification.",
    infoSection: "Information",
    chooseEmployer: "Select the employer for this certification",
    employer: "Employer",
    anticipatedStartDate: "Anticipated Start Date",
    numberOfWorkers: "Number of Workers",
    workLocation: "Work Location",
    assignedCaseManager: "Assigned Case Manager",
    visaSection: "Visa Category",
    chooseVisaCategory: "Select the visa category for this certification",
    selectVisaType: "Select Visa Type",
    visaH2A: "H-2A (Agricultural)",
    visaH2B: "H-2B (Non-Agricultural)",
    modality: "Modality",
    unnamed: "Unnamed",
    named: "Named",
    documentsSection: "Documents",
    uploadDocuments: "Upload required documents",
    documentsTip: "Uploading previous year documents can save up to 80% of data entry time.",
    dragDrop: "Drag and drop files here, or click to select",
    createCertification: "Create Certification",

    // Foreign Worker Jobs
    foreignProcess: "Foreign Worker Jobs",
    trackForeignWorkerJobs: "Track foreign worker job postings",
    startDate: "Start Date",
    viewMoreJobs: (count: number) => `View ${count} more jobs`,

    // Validation messages
    required: "This field is required",
    minTwoChars: "Must be at least 2 characters",
    invalidEmail: "Invalid email address",
    phoneMinMax: "Phone must be between 8-10 digits",
    maxChars: "Maximum 500 characters allowed",
    fieldRequired: "Field is required, enter the information",
    fieldRequiredSelect: "Field is required, select an option",

    // Common
    cancel: "Cancel",
    continue: "Continue",
    skipUpload: "Skip upload",

    // Source Documents
    sourceDocuments: "Source documents",
    sourceDocumentsUploaded: (count: number) => `${count} Source Documents uploaded`,
    addSourceDocument: "Add Source Document",
    uploadTip:
      "Tip: Uploading previous year documents can save up to 80% of data entry time. We'll extract data to pre-fill your forms automatically.",
    noDocumentsAdded: "No documents have been added",
  },
  es: {
    // Navigation & Sections
    dashboard: "Panel de Control",
    employers: "Empleadores",
    certifications: "Certificaciones",
    staffAgent: "Agente de Personal",
    calendar: "Calendario",
    messages: "Mensajes",

    // Employers Section
    companies: "Empresas",
    manageEmployers: "Gestiona tus empleadores",
    searchEmployers: "Buscar empleadores...",
    addEmployer: "Agregar Empleador",
    addEmployerTitle: "Agregar Nuevo Empleador",
    addEmployerDescription: "Completa los datos del empleador y envíale una invitación para unirse.",
    companyName: "Nombre de la Empresa",
    companyNamePlaceholder: "Ingresa el nombre de la empresa",
    primaryContact: "Contacto Principal",
    primaryContactPlaceholder: "Ingresa el nombre del contacto",
    emailAddress: "Dirección de Correo",
    email: "Correo",
    emailPlaceholder: "Ingresa la dirección de correo",
    phone: "Teléfono",
    phonePlaceholder: "Ingresa el número de teléfono",
    invitationMessage: "Mensaje de Invitación",
    sendInvitation: "Enviar Invitación",

    // Table Headers
    id: "ID",
    location: "Ubicación",
    status: "Estado",
    caseManager: "Gestor de Caso",
    actions: "Acciones",
    viewDetails: "Ver Detalles",
    edit: "Editar",
    delete: "Eliminar",

    // Pagination
    showing: "Mostrando",
    to: "a",
    of: "de",
    records: "registros",
    previous: "Anterior",
    next: "Siguiente",

    // Certifications Section
    certificationsCount: (count: number) => `${count} Certificaciones`,
    kanbanView: "Vista Kanban",
    listView: "Vista de Lista",
    addCertification: "Agregar Certificación",
    prevailingWageRate: "Salario Prevaleciente",
    step1: "Paso 1",
    step2: "Paso 2",
    step3: "Paso 3",
    laborCertification: "Certificación de Trabajo",
    i129Petition: "Petición I-129",

    // Certification Form
    newH2Certification: "Nueva Certificación H-2",
    certificationDescription: "Crear una nueva certificación de trabajo H-2A o H-2B.",
    infoSection: "Información",
    chooseEmployer: "Selecciona el empleador para esta certificación",
    employer: "Empleador",
    anticipatedStartDate: "Fecha de Inicio Anticipada",
    numberOfWorkers: "Número de Trabajadores",
    workLocation: "Ubicación del Trabajo",
    assignedCaseManager: "Gestor de Caso Asignado",
    visaSection: "Categoría de Visa",
    chooseVisaCategory: "Selecciona la categoría de visa para esta certificación",
    selectVisaType: "Selecciona el Tipo de Visa",
    visaH2A: "H-2A (Agrícola)",
    visaH2B: "H-2B (No Agrícola)",
    modality: "Modalidad",
    unnamed: "Sin Nombre",
    named: "Nominado",
    documentsSection: "Documentos",
    uploadDocuments: "Carga los documentos requeridos",
    documentsTip: "Subir documentos del año anterior puede ahorrar hasta un 80% del tiempo de entrada de datos.",
    dragDrop: "Arrastra y suelta archivos aquí, o haz clic para seleccionar",
    createCertification: "Crear Certificación",

    // Foreign Worker Jobs
    foreignProcess: "Empleos de Trabajador Extranjero",
    trackForeignWorkerJobs: "Rastrear publicaciones de empleos de trabajadores extranjeros",
    startDate: "Fecha de Inicio",
    viewMoreJobs: (count: number) => `Ver ${count} empleos más`,

    // Validation messages
    required: "Este campo es obligatorio",
    minTwoChars: "Debe tener al menos 2 caracteres",
    invalidEmail: "Dirección de correo inválida",
    phoneMinMax: "El teléfono debe tener entre 8-10 dígitos",
    maxChars: "Máximo 500 caracteres permitidos",
    fieldRequired: "El campo es obligatorio, ingresa la información",
    fieldRequiredSelect: "El campo es obligatorio, selecciona una opción",

    // Common
    cancel: "Cancelar",
    continue: "Continuar",
    skipUpload: "Omitir carga",

    // Source Documents
    sourceDocuments: "Documentos fuente",
    sourceDocumentsUploaded: (count: number) => `${count} Documentos fuente subidos`,
    addSourceDocument: "Agregar documento fuente",
    uploadTip:
      "Consejo: Subir documentos del año anterior puede ahorrar hasta un 80% del tiempo de entrada de datos. Extraeremos los datos para rellenar tus formularios automáticamente.",
    noDocumentsAdded: "No se ha agregado ningún documento",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
