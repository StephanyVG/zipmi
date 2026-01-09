"use client"
import { useState } from "react"
import { useRouter, useSearchParams, useParams } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import {
  ChevronLeft,
  Info,
  Plus,
  Trash2,
  MoreHorizontal,
  Edit,
  Pencil,
  MoreVertical,
  AlertCircle,
  SettingsIcon,
  Check,
  Eye,
  InfoIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"

export default function ETA9141FormPage() {
  const params = useParams()
  const certificationId = params.id as string
  const router = useRouter()
  const searchParams = useSearchParams()
  const isAutofilled = searchParams.get("autofill") === "true"
  const shouldAutofill = isAutofilled // Fix: Declare shouldAutofill

  const { t, language } = useLanguage() // Import translation object and language

  const [currentStep, setCurrentStep] = useState(1)
  // const certificationId = params.id as string // Removed this line and use the destructured id above

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const [employerInfo, setEmployerInfo] = useState({
    legalName: isAutofilled ? "Peterson Yards Inc" : "",
    address: isAutofilled ? "123 Farm Road, Salinas, CA 93901" : "",
    fein: isAutofilled ? "12-3456729" : "",
    telephone: isAutofilled ? "+1 (555) 123-4567, Ext. 101" : "",
    contact: isAutofilled ? "Robert Johnson L." : "",
    email: isAutofilled ? "businessemail@address.com" : "",
  })

  const [requestorData, setRequestorData] = useState({
    lastName: isAutofilled ? "Johnson" : "",
    middleName: isAutofilled ? "L." : "",
    firstName: isAutofilled ? "Robert" : "",
    jobTitle: isAutofilled ? "HR Manager" : "",
    address1: isAutofilled ? "123 Farm Road" : "",
    address2: isAutofilled ? "Suite 200" : "",
    city: isAutofilled ? "Salinas" : "",
    state: isAutofilled ? "California" : "",
    postalCode: isAutofilled ? "93901" : "",
    province: isAutofilled ? "" : "",
    country: isAutofilled ? "United States" : "",
    telephone: isAutofilled ? "5551234567" : "", // Updated to only numbers
    areaCode: isAutofilled ? "+1" : "", // Added areaCode
    extension: isAutofilled ? "101" : "",
    fax: isAutofilled ? "5551234568" : "", // Updated to only numbers
    faxAreaCode: isAutofilled ? "+1" : "", // Added faxAreaCode
    email: isAutofilled ? "robert.johnson@petersonyards.com" : "",
  })

  const [employerData, setEmployerData] = useState({
    legalName: isAutofilled ? "Peterson Yards Inc" : "",
    tradeName: isAutofilled ? "Peterson Farms" : "",
    address1: isAutofilled ? "123 Farm Road" : "",
    address2: isAutofilled ? "Building A" : "",
    city: isAutofilled ? "Salinas" : "",
    state: isAutofilled ? "california" : "",
    postalCode: isAutofilled ? "93901" : "",
    country: isAutofilled ? "united-states" : "",
    fein: isAutofilled ? "12-3456729" : "",
    naicsCode: isAutofilled ? "111998" : "",
    yearEstablished: isAutofilled ? "2005" : "",
    telephone: isAutofilled ? "5551234567" : "", // Updated to only numbers
    areaCode: isAutofilled ? "+1" : "", // Added areaCode
    extension: isAutofilled ? "101" : "",
    contact: isAutofilled ? "Robert Johnson L." : "",
    email: isAutofilled ? "businessemail@address.com" : "",
  })

  const [visaType, setVisaType] = useState("H-2B")

  const [wageProcessing, setWageProcessing] = useState({
    d1: "yes",
    d2: "yes",
    d3: "yes",
    d4: "no", // Kept d4 as 'no' as it was not specified in the updates.
  })

  const [jobDescription, setJobDescription] = useState({
    // Add visaType, workCity, workState, workCounty, workPostalCode, multipleWorksites
    visaType: isAutofilled ? "H2B" : "",
    jobTitle: isAutofilled ? "Farm Worker, General" : "",
    socCode: isAutofilled ? "45-2092.00" : "",
    jobDuties: isAutofilled
      ? "Plant, cultivate, and harvest vegetables, fruits, and other agricultural products. Perform manual labor tasks including seeding, weeding, thinning, pruning, and harvesting crops. Operate and maintain farm equipment. Load and unload harvested crops. Maintain clean and safe working conditions in fields."
      : "",
    travelRequired: "yes",
    placeOfWork: isAutofilled ? "Salinas, CA" : "",
    workCity: isAutofilled ? "Salinas" : "",
    workState: isAutofilled ? "california" : "",
    workCounty: isAutofilled ? "District of Columbia" : "",
    workPostalCode: isAutofilled ? "93901" : "",
    multipleWorksites: isAutofilled ? "no" : "",
    // Added missing taskDescription for review step
    taskDescription: isAutofilled
      ? "Plant, cultivate, and harvest vegetables, fruits, and other agricultural products. Perform manual labor tasks including seeding, weeding, thinning, pruning, and harvesting crops. Operate and maintain farm equipment. Load and unload harvested crops. Maintain clean and safe working conditions in fields."
      : "",
    supervisesOthers: isAutofilled ? "no" : "", // Added supervisesOthers field
  })

  const [jobRequirements, setJobRequirements] = useState({
    education: isAutofilled ? "None" : "",
    secondDiploma: "yes", // Changed from usEquivalent to secondDiploma
    trainingRequired: "yes",
    experienceRequired: isAutofilled ? "3 Months, Agricultural Worker" : "", // Combined experienceMonths and experienceField
    specialRequirements: isAutofilled
      ? "No special requirements. On-the-job training provided. Must be able to work outdoors in various weather conditions."
      : "",
    supervisesOthers: isAutofilled ? "no" : "", // Added supervisesOthers
  })

  const [placeOfEmployment, setPlaceOfEmployment] = useState({
    multipleWorksites: "no",
    city: shouldAutofill ? "Salinas" : "",
    state: shouldAutofill ? "california" : "",
    county: shouldAutofill ? "Monterey" : "",
    postalCode: shouldAutofill ? "93901" : "",
    fullTimePosition: "yes", // Added
    temporaryPosition: "yes", // Added
  })

  const [formSections, setFormSections] = useState([
    { id: 1, title: "Employment-Based Visa Information", completed: false },
    { id: 2, title: "Requestor Point-of-Contact Information", completed: false },
    { id: 3, title: "Employer Information", completed: false },
    { id: 4, title: "Wage Processing Information", completed: false },
    { id: 5, title: "Job Description", completed: false },
    { id: 6, title: "Minimum Job Requirements", completed: false },
    { id: 7, title: "Place of Employment Information", completed: false },
    { id: 8, title: "Additional Worksites", completed: false },
    { id: 9, title: "Application Documents", completed: false },
    { id: 10, title: "Review and Submit", completed: false },
  ])

  const [additionalWorksites, setAdditionalWorksites] = useState(
    // Initialize based on autofill parameter
    isAutofilled
      ? [
          {
            id: 1,
            city: "Washington",
            state: "District of Columbia",
            country: "-",
            metropolitan: "-",
            msa: "", // Added msa to match the review step
          },
        ]
      : [],
  )

  const [isWorksiteDialogOpen, setIsWorksiteDialogOpen] = useState(false)
  const [editingWorksiteId, setEditingWorksiteId] = useState<number | null>(null)
  const [worksiteForm, setWorksiteForm] = useState({
    city: "",
    state: "",
    country: "",
    metropolitan: "",
    msa: "", // Added msa to match the review step
  })

  const openWorksiteDialog = () => {
    setEditingWorksiteId(null)
    setWorksiteForm({
      city: "",
      state: "",
      country: "",
      metropolitan: "",
      msa: "", // Reset msa
    })
    setIsWorksiteDialogOpen(true)
  }

  const editWorksite = (worksite: any) => {
    setEditingWorksiteId(worksite.id)
    setWorksiteForm({
      city: worksite.city,
      state: worksite.state,
      country: worksite.country,
      metropolitan: worksite.metropolitan,
      msa: worksite.msa, // Set msa
    })
    setIsWorksiteDialogOpen(true)
  }

  const deleteWorksite = (id: number) => {
    setAdditionalWorksites(additionalWorksites.filter((w) => w.id !== id))
  }

  const saveWorksite = () => {
    if (editingWorksiteId) {
      // Update existing
      setAdditionalWorksites(
        additionalWorksites.map((w) => (w.id === editingWorksiteId ? { ...w, ...worksiteForm } : w)),
      )
    } else {
      // Add new
      setAdditionalWorksites([
        ...additionalWorksites,
        {
          id: Date.now(),
          ...worksiteForm,
        },
      ])
    }
    setIsWorksiteDialogOpen(false)
  }

  const [additionalDocuments, setAdditionalDocuments] = useState<Array<{ name: string; category: string }>>([])
  const [isDocumentDialogOpen, setIsDocumentDialogOpen] = useState(false)
  const [editingDocumentIndex, setEditingDocumentIndex] = useState<number | null>(null)
  const [newDocument, setNewDocument] = useState({ name: "", category: "" })

  const handleAddDocument = () => {
    if (newDocument.name && newDocument.category) {
      if (editingDocumentIndex !== null) {
        const updatedDocuments = [...additionalDocuments]
        updatedDocuments[editingDocumentIndex] = newDocument
        setAdditionalDocuments(updatedDocuments)
      } else {
        setAdditionalDocuments([...additionalDocuments, newDocument])
      }
      setNewDocument({ name: "", category: "" })
      setIsDocumentDialogOpen(false)
    }
  }

  const handleEditDocument = (index: number) => {
    setEditingDocumentIndex(index)
    setNewDocument(additionalDocuments[index])
    setIsDocumentDialogOpen(true)
  }

  const handleDeleteDocument = (index: number) => {
    setAdditionalDocuments(additionalDocuments.filter((_, i) => i !== index))
  }

  const currentSection = formSections.find((section) => section.id === currentStep)

  const handleNext = () => {
    if (currentStep < formSections.length) {
      setFormSections((prev) =>
        prev.map((section) => (section.id === currentStep ? { ...section, completed: true } : section)),
      )
      setCurrentStep(currentStep + 1)
    } else {
      // If on the last step, handle submission logic
      // For now, we'll just log or show a confirmation
      console.log("Form submitted!")
      router.push(`/certifications/${certificationId}/forms/eta-9141/submitted`)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Placeholder for employerInfo and requestorInfo to avoid TS errors
  // These would ideally be populated from actual data sources or state
  // const employerInfo = employerData // Remove this and use the state variable directly
  // const requestorInfo = requestorData // Remove this and use the state variable directly

  const [validationRequested, setValidationRequested] = useState(false)
  const [employerCertified, setEmployerCertified] = useState(false)
  const [isFlagAuthDialogOpen, setIsFlagAuthDialogOpen] = useState(false)
  const [isSubmissionSuccessOpen, setIsSubmissionSuccessOpen] = useState(false)
  const [flagPassword, setFlagPassword] = useState("")
  const [flagAuthCode, setFlagAuthCode] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const [validationChecklist, setValidationChecklist] = useState({
    visaInfo: false,
    requestorInfo: false,
    employerInfo: false,
    wageProcessing: false,
    jobDescription: false,
    jobRequirements: false,
    placeOfEmployment: false,
    additionalWorksites: false,
    applicationDocuments: false,
  })

  const handleChecklistChange = (field: keyof typeof validationChecklist) => {
    setValidationChecklist((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  const validateField = (fieldName: string, value: any, fieldType: "input" | "select" | "radio" = "input") => {
    if (!value || value === "") {
      if (fieldType === "select") {
        setErrors((prev) => ({ ...prev, [fieldName]: t.fieldRequiredSelect }))
      } else {
        setErrors((prev) => ({ ...prev, [fieldName]: t.fieldRequired }))
      }
      return false
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[fieldName]
        return newErrors
      })
      return true
    }
  }

  const handleBlur = (fieldName: string, value: any, fieldType: "input" | "select" | "radio" = "input") => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }))
    validateField(fieldName, value, fieldType)
  }

  const handleNextStep = () => {
    let allValid = true
    let currentFieldsToValidate: string[] = []

    console.log("[v0] handleNextStep called, currentStep:", currentStep)

    // Define fields to validate based on currentStep
    if (currentStep === 1) {
      currentFieldsToValidate = ["visa-type"]
    } else if (currentStep === 2) {
      currentFieldsToValidate = [
        "req-lastName",
        "req-firstName",
        "req-jobTitle",
        "req-address1",
        "req-city",
        "req-state",
        "req-postalCode",
        "req-country",
        "req-telephone",
        "req-email",
      ]
    } else if (currentStep === 3) {
      // since those fields don't exist in the employer form
      currentFieldsToValidate = [
        "emp-legal-name",
        "emp-address-1",
        "emp-city",
        "emp-state",
        "emp-postal-code",
        "emp-country",
        "emp-fein",
        "emp-telephone",
      ]
      console.log("[v0] Step 3 - employerData:", JSON.stringify(employerData))
    } else if (currentStep === 7) {
      currentFieldsToValidate = ["worksite-city", "worksite-state", "worksite-county", "worksite-postal"]
    }

    console.log("[v0] Fields to validate:", JSON.stringify(currentFieldsToValidate))

    currentFieldsToValidate.forEach((field) => {
      let value = ""
      let type: "input" | "select" | "radio" = "input"

      if (field === "visa-type") {
        value = visaType
        type = "select"
      } else if (field.startsWith("req-")) {
        // Requestor fields (step 2)
        const reqField = field.replace("req-", "")
        switch (reqField) {
          case "lastName":
            value = requestorData.lastName
            break
          case "firstName":
            value = requestorData.firstName
            break
          case "jobTitle":
            value = requestorData.jobTitle
            break
          case "address1":
            value = requestorData.address1
            break
          case "city":
            value = requestorData.city
            break
          case "state":
            value = requestorData.state
            type = "select"
            break
          case "postalCode":
            value = requestorData.postalCode
            break
          case "country":
            value = requestorData.country
            type = "select"
            break
          case "telephone":
            value = requestorData.telephone
            break
          case "email":
            value = requestorData.email
            break
        }
      } else if (field.startsWith("emp-")) {
        // Employer fields (step 3)
        const empField = field.replace("emp-", "")
        switch (empField) {
          case "legal-name":
            value = employerData.legalName
            break
          case "address-1":
            value = employerData.address1
            break
          case "city":
            value = employerData.city
            break
          case "state":
            value = employerData.state
            type = "select"
            break
          case "postal-code":
            value = employerData.postalCode
            break
          case "country":
            value = employerData.country
            type = "select"
            break
          case "fein":
            value = employerData.fein
            break
          case "telephone":
            value = employerData.telephone
            break
          case "contact":
            value = employerData.contact
            break
          case "email":
            value = employerData.email
            break
        }
      } else if (field.startsWith("worksite-")) {
        // Worksite fields (step 7)
        switch (field) {
          case "worksite-city":
            value = placeOfEmployment.city
            break
          case "worksite-state":
            value = placeOfEmployment.state
            type = "select"
            break
          case "worksite-county":
            value = placeOfEmployment.county
            break
          case "worksite-postal":
            value = placeOfEmployment.postalCode
            break
        }
      }

      if (!validateField(field, value, type)) {
        allValid = false
        console.log("[v0] Field failed validation:", field, "value:", value)
      }
    })

    console.log("[v0] allValid:", allValid)

    if (allValid) {
      handleNext()
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 bg-background shadow-none border-none">
          <div className="flex items-center gap-2 text-sm text-secondary-font">
            <button
              onClick={() => router.push("/?section=certifications")}
              className="hover:text-primary-font transition-colors"
            >
              <ChevronLeft className="h-4 w-4 inline" />
              Certifications
            </button>
            <span>/</span>
            <button
              onClick={() => router.push(`/certifications/${certificationId}`)}
              className="hover:text-primary-font transition-colors"
            >
              PET-2025-001234
            </button>
            <span>/</span>
            <span className="text-primary-font">ETA-9141</span>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-6 bg-transparent">
          <h1 className="text-2xl font-semibold text-[#0045FF] mb-1">ETA-9141</h1>
          <p className="text-sm text-secondary-font">Application for Prevailing Wage Determination</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Progress Steps */}
          <div className="lg:col-span-3">
            <div className="bg-white p-4 lg:p-6 lg:sticky lg:top-6 border-transparent border-0 rounded-xl shadow-none overflow-hidden max-h-[calc(100vh-8rem)] overflow-y-auto">
              <nav className="space-y-2">
                {formSections.map((section) => {
                  const isClickable = section.completed || section.id <= currentStep

                  return (
                    <button
                      key={section.id}
                      onClick={() => isClickable && setCurrentStep(section.id)}
                      disabled={!isClickable}
                      className={`flex items-center gap-3 w-full text-left py-2 px-3 rounded-md transition-colors ${
                        section.id === currentStep
                          ? "bg-[#E7F6FF] text-[#0045FF]"
                          : section.completed
                            ? "text-primary-font hover:bg-background cursor-pointer"
                            : isClickable
                              ? "text-primary-font hover:bg-background cursor-pointer"
                              : "text-tertiary-font cursor-not-allowed opacity-50"
                      }`}
                    >
                      <div
                        className={`h-6 w-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          section.id === currentStep
                            ? "border-[#0045FF] bg-[#0045FF]"
                            : section.completed
                              ? "border-[#0045FF] bg-[#0045FF]"
                              : "border-border bg-white"
                        }`}
                      >
                        {section.completed ? (
                          <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : section.id === currentStep ? (
                          <div className="h-2 w-2 rounded-full bg-white" />
                        ) : null}
                      </div>
                      <span className="text-sm">{section.title}</span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9 flex-1 min-w-0">
            <div className="bg-white border-border rounded-xl border-0 shadow-none min-h-[calc(100vh-12rem)] lg:h-[calc(100vh-12rem)] overflow-y-auto flex flex-col">
              <div className="px-4 sm:px-8 lg:px-16 xl:px-32 2xl:px-60 py-6 sm:py-8">
                {/* Section Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-[#0045FF] mb-2">{currentSection?.title}</h2>
                    <p className="text-sm text-secondary-font">
                      Fields with data extracted from the previous year - Check and edit as necessary
                    </p>
                  </div>
                  <span className="text-sm text-tertiary-font ml-4 shrink-0">
                    {currentStep} / {formSections.length}
                  </span>
                </div>

                {/* Important Alert */}
                <Alert className="mb-8 bg-[#FFF8E1] border-[#FFD54F]">
                  <Info className="h-5 w-5 text-[#F57C00]" />
                  <AlertDescription className="text-[#5D4037]">
                    <span className="font-semibold">Important</span>
                    <br />
                    Please read these instructions carefully before completing the Form ETA-9141, Application for
                    Prevailing Wage Determination. These instructions contain full explanations of the questions that
                    make up the Form ETA-9141.
                    <br />
                    <br />
                    Anyone, who knowingly and willingly furnishes any false information in the preparation of Form
                    ETA-9141 and any supporting documentation, or aids, abets, or counsels another to do so is
                    committing a federal offense, punishable by fine or imprisonment up to five years or both (18 U.S.C.
                    55 2, 1001). Other penalties apply as well to fraud or misuse of this immigration document and to
                    perjury with respect to this form (18 U.S.C. §§ 1546, 1621).
                  </AlertDescription>
                </Alert>

                {/* Content Area - fills available width */}
                <div className="flex-1">
                  {/* Form Content - Step 1 */}
                  {currentStep === 1 && (
                    <>
                      <Alert className="mb-6 border-[#FFA726] bg-[#FFF8E1]">
                        <Info className="h-5 w-5 text-[#F57C00]" />
                        <AlertDescription className="text-[#5D4037]">
                          <span className="font-semibold">Important</span>
                          <br />
                          Please read these instructions carefully before completing the Form ETA-9141, Application for
                          Prevailing Wage Determination. These instructions contain full explanations of the questions
                          that make up the Form ETA-9141.
                          <br />
                          <br />
                          Anyone, who knowingly and willingly furnishes any false information in the preparation of Form
                          ETA-9141 and any supporting documentation, or aids, abets, or counsels another to do so is
                          committing a federal offense, punishable by fine or imprisonment up to five years or both (18
                          U.S.C. 55 2, 1001). Other penalties apply as well to fraud or misuse of this immigration
                          document and to perjury with respect to this form (18 U.S.C. §§ 1546, 1621).
                        </AlertDescription>
                      </Alert>

                      <div className="space-y-4">
                        <Label htmlFor="visa-type" className="text-base font-medium text-primary-font">
                          A. 1 Indicate the type of visa classification supported by this application
                        </Label>
                        <Select
                          defaultValue="H-2B"
                          onValueChange={(value) => {
                            setVisaType(value)
                            validateField("visa-type", value, "select")
                          }}
                          onOpenChange={(open) => {
                            if (!open && touched["visa-type"]) {
                              validateField("visa-type", visaType, "select")
                            }
                          }}
                        >
                          <SelectTrigger className={`w-full ${errors["visa-type"] ? "border-red-500" : ""}`}>
                            <SelectValue placeholder="Select visa type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="H-2A">H-2A</SelectItem>
                            <SelectItem value="H-2B">H-2B</SelectItem>
                            <SelectItem value="H-1B">H-1B</SelectItem>
                            <SelectItem value="E-3">E-3</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors["visa-type"] && (
                          <p className="text-sm text-red-500 mt-1 break-words">{errors["visa-type"]}</p>
                        )}
                      </div>
                    </>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-8">
                      {/* Name and Title Section */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                          <h3 className="text-base font-semibold text-primary-font">Name and Title</h3>
                          {isAutofilled && (
                            <Badge variant="info" className="bg-[#D3EFFF] text-[#0B38A4]">
                              Autopopulated
                            </Badge>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="req-lastName" className="text-sm text-secondary-font mb-2">
                              B.1 Last Name
                            </Label>
                            <Input
                              id="req-lastName"
                              placeholder="Enter last name"
                              value={requestorData.lastName}
                              onChange={(e) => {
                                setRequestorData({ ...requestorData, lastName: e.target.value })
                                if (touched["req-lastName"]) {
                                  validateField("req-lastName", e.target.value)
                                }
                              }}
                              onBlur={() => handleBlur("req-lastName", requestorData.lastName)}
                              className={`w-full ${errors["req-lastName"] ? "border-red-500" : ""}`}
                            />
                            {errors["req-lastName"] && (
                              <p className="text-sm text-red-500 mt-1 break-words">{errors["req-lastName"]}</p>
                            )}
                          </div>
                          <div>
                            <Label htmlFor="middleName" className="text-sm text-secondary-font mb-2">
                              B.2 Middle Name(s)
                            </Label>
                            <Input
                              id="middleName"
                              placeholder="Enter middle name"
                              value={requestorData.middleName}
                              onChange={(e) => {
                                setRequestorData({ ...requestorData, middleName: e.target.value })
                                if (touched["middleName"]) {
                                  validateField("middleName", e.target.value)
                                }
                              }}
                              onBlur={() => handleBlur("middleName", requestorData.middleName)}
                              className={`w-full ${errors["middleName"] ? "border-red-500" : ""}`}
                            />
                            {errors["middleName"] && (
                              <p className="text-sm text-red-500 mt-1 break-words">{errors["middleName"]}</p>
                            )}
                          </div>
                          <div>
                            <Label htmlFor="req-firstName" className="text-sm text-secondary-font mb-2">
                              B.3 First Name
                            </Label>
                            <Input
                              id="req-firstName"
                              placeholder="Enter first name"
                              value={requestorData.firstName}
                              onChange={(e) => {
                                setRequestorData({ ...requestorData, firstName: e.target.value })
                                if (touched["req-firstName"]) {
                                  validateField("req-firstName", e.target.value)
                                }
                              }}
                              onBlur={() => handleBlur("req-firstName", requestorData.firstName)}
                              className={`w-full ${errors["req-firstName"] ? "border-red-500" : ""}`}
                            />
                            {errors["req-firstName"] && (
                              <p className="text-sm text-red-500 mt-1 break-words">{errors["req-firstName"]}</p>
                            )}
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="req-jobTitle" className="text-sm text-secondary-font mb-2">
                            B.4 Contact's Job Title
                          </Label>
                          <Input
                            id="req-jobTitle"
                            placeholder="Enter job title"
                            value={requestorData.jobTitle}
                            onChange={(e) => {
                              setRequestorData({ ...requestorData, jobTitle: e.target.value })
                              if (touched["req-jobTitle"]) {
                                validateField("req-jobTitle", e.target.value)
                              }
                            }}
                            onBlur={() => handleBlur("req-jobTitle", requestorData.jobTitle)}
                            className={`w-full ${errors["req-jobTitle"] ? "border-red-500" : ""}`}
                          />
                          {errors["req-jobTitle"] && (
                            <p className="text-sm text-red-500 mt-1 break-words">{errors["req-jobTitle"]}</p>
                          )}
                        </div>
                      </div>

                      {/* Address Section */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                          <h3 className="text-base font-semibold text-primary-font">Address</h3>
                          {isAutofilled && (
                            <Badge variant="info" className="bg-[#D3EFFF] text-[#0B38A4]">
                              Autopopulated
                            </Badge>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="req-address1" className="text-sm text-secondary-font mb-2">
                            B.5 Address 1
                          </Label>
                          <Input
                            id="req-address1"
                            placeholder="Enter street address"
                            value={requestorData.address1}
                            onChange={(e) => {
                              setRequestorData({ ...requestorData, address1: e.target.value })
                              if (touched["req-address1"]) {
                                validateField("req-address1", e.target.value)
                              }
                            }}
                            onBlur={() => handleBlur("req-address1", requestorData.address1)}
                            className={`w-full ${errors["req-address1"] ? "border-red-500" : ""}`}
                          />
                          {errors["req-address1"] && (
                            <p className="text-sm text-red-500 mt-1 break-words">{errors["req-address1"]}</p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="address2" className="text-sm text-secondary-font mb-2">
                            B.6 Address 2
                          </Label>
                          <Input
                            id="address2"
                            placeholder="Enter apartment, suite, unit, etc."
                            value={requestorData.address2}
                            onChange={(e) => {
                              setRequestorData({ ...requestorData, address2: e.target.value })
                              if (touched["address2"]) {
                                validateField("address2", e.target.value)
                              }
                            }}
                            onBlur={() => handleBlur("address2", requestorData.address2)}
                            className={`w-full ${errors["address2"] ? "border-red-500" : ""}`}
                          />
                          {errors["address2"] && (
                            <p className="text-sm text-red-500 mt-1 break-words">{errors["address2"]}</p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="req-city" className="text-sm text-secondary-font mb-2">
                            B.7 City
                          </Label>
                          <Input
                            id="req-city"
                            placeholder="Enter city"
                            value={requestorData.city}
                            onChange={(e) => {
                              setRequestorData({ ...requestorData, city: e.target.value })
                              if (touched["req-city"]) {
                                validateField("req-city", e.target.value)
                              }
                            }}
                            onBlur={() => handleBlur("req-city", requestorData.city)}
                            className={`w-full ${errors["req-city"] ? "border-red-500" : ""}`}
                          />
                          {errors["req-city"] && (
                            <p className="text-sm text-red-500 mt-1 break-words">{errors["req-city"]}</p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="req-state" className="text-sm text-secondary-font mb-2">
                            B.9 State
                          </Label>
                          <Select
                            defaultValue=""
                            onValueChange={(value) => {
                              setRequestorData({ ...requestorData, state: value })
                              validateField("req-state", value, "select")
                            }}
                            onOpenChange={(open) => {
                              if (!open && touched["req-state"]) {
                                validateField("req-state", requestorData.state, "select")
                              }
                            }}
                          >
                            <SelectTrigger
                              id="req-state"
                              className={`w-full ${errors["req-state"] ? "border-red-500" : ""}`}
                            >
                              <SelectValue
                                placeholder={language === "es" ? "Selecciona una opción" : "Select an option"}
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="California">California</SelectItem>
                              <SelectItem value="Texas">Texas</SelectItem>
                              <SelectItem value="Florida">Florida</SelectItem>
                              <SelectItem value="New York">New York</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors["req-state"] && (
                            <p className="text-sm text-red-500 mt-1 break-words">{errors["req-state"]}</p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="req-postalCode" className="text-sm text-secondary-font mb-2">
                            B.9 Postal Code
                          </Label>
                          <Input
                            id="req-postalCode"
                            placeholder="Enter postal code"
                            value={requestorData.postalCode}
                            onChange={(e) => {
                              const numericValue = e.target.value.replace(/[^0-9]/g, "")
                              setRequestorData({ ...requestorData, postalCode: numericValue })
                              if (touched["req-postalCode"]) {
                                validateField("req-postalCode", numericValue)
                              }
                            }}
                            onBlur={() => handleBlur("req-postalCode", requestorData.postalCode)}
                            className={`w-full ${errors["req-postalCode"] ? "border-red-500" : ""}`}
                            inputMode="numeric"
                            maxLength={10}
                          />
                          {errors["req-postalCode"] && (
                            <p className="text-sm text-red-500 mt-1 break-words">{errors["req-postalCode"]}</p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="province" className="text-sm text-secondary-font mb-2">
                            B.10 Province
                          </Label>
                          <Input
                            id="province"
                            placeholder="Enter province (if applicable)"
                            value={requestorData.province}
                            onChange={(e) => setRequestorData({ ...requestorData, province: e.target.value })}
                            className="w-full"
                          />
                        </div>

                        <div>
                          <Label htmlFor="req-country" className="text-sm text-secondary-font mb-2">
                            B.12 Country
                          </Label>
                          <Select
                            defaultValue=""
                            onValueChange={(value) => {
                              setRequestorData({ ...requestorData, country: value })
                              validateField("req-country", value, "select")
                            }}
                            onOpenChange={(open) => {
                              if (!open && touched["req-country"]) {
                                validateField("req-country", requestorData.country, "select")
                              }
                            }}
                          >
                            <SelectTrigger
                              id="req-country"
                              className={`w-full ${errors["req-country"] ? "border-red-500" : ""}`}
                            >
                              <SelectValue
                                placeholder={language === "es" ? "Selecciona una opción" : "Select an option"}
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="United States">United States</SelectItem>
                              <SelectItem value="Canada">Canada</SelectItem>
                              <SelectItem value="Mexico">Mexico</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors["req-country"] && (
                            <p className="text-sm text-red-500 mt-1 break-words">{errors["req-country"]}</p>
                          )}
                        </div>
                      </div>

                      {/* Contact Information Section */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                          <h3 className="text-base font-semibold text-primary-font">Contact Information</h3>
                          {isAutofilled && (
                            <Badge variant="info" className="bg-[#D3EFFF] text-[#0B38A4]">
                              Autopopulated
                            </Badge>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Made contact fields responsive from mobile */}
                          <div>
                            <Label htmlFor="req-telephone" className="text-sm text-secondary-font mb-2">
                              B.12 Telephone Number
                            </Label>
                            <div className="flex gap-2">
                              <Input
                                id="req-area-code"
                                placeholder="+1"
                                value={requestorData.areaCode || ""}
                                onChange={(e) => {
                                  const numericValue = e.target.value.replace(/[^0-9+]/g, "")
                                  setRequestorData({ ...requestorData, areaCode: numericValue })
                                }}
                                className="w-20"
                                inputMode="tel"
                                maxLength={4}
                              />
                              <Input
                                id="req-telephone"
                                placeholder="Enter phone number"
                                value={requestorData.telephone}
                                onChange={(e) => {
                                  const numericValue = e.target.value.replace(/[^0-9]/g, "")
                                  setRequestorData({ ...requestorData, telephone: numericValue })
                                  if (touched["req-telephone"]) {
                                    validateField("req-telephone", numericValue)
                                  }
                                }}
                                onBlur={() => handleBlur("req-telephone", requestorData.telephone)}
                                className={`flex-1 ${errors["req-telephone"] ? "border-red-500" : ""}`}
                                inputMode="numeric"
                                maxLength={10}
                              />
                            </div>
                            {errors["req-telephone"] && (
                              <p className="text-sm text-red-500 mt-1 break-words">{errors["req-telephone"]}</p>
                            )}
                          </div>
                          <div>
                            <Label htmlFor="extension" className="text-sm text-secondary-font mb-2">
                              B.13 Extension
                            </Label>
                            <Input
                              id="extension"
                              placeholder="Enter extension"
                              value={requestorData.extension}
                              onChange={(e) => {
                                const numericValue = e.target.value.replace(/[^0-9]/g, "")
                                setRequestorData({ ...requestorData, extension: numericValue })
                                if (touched["extension"]) {
                                  validateField("extension", numericValue)
                                }
                              }}
                              onBlur={() => handleBlur("extension", requestorData.extension)}
                              className={`w-full ${errors["extension"] ? "border-red-500" : ""}`}
                              inputMode="numeric"
                              maxLength={6}
                            />
                            {errors["extension"] && (
                              <p className="text-sm text-red-500 mt-1 break-words">{errors["extension"]}</p>
                            )}
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="fax" className="text-sm text-secondary-font mb-2">
                            B.14 Fax Number
                          </Label>
                          <div className="flex gap-2">
                            <Input
                              id="fax-area-code"
                              placeholder="+1"
                              value={requestorData.faxAreaCode || ""}
                              onChange={(e) => {
                                const numericValue = e.target.value.replace(/[^0-9+]/g, "")
                                setRequestorData({ ...requestorData, faxAreaCode: numericValue })
                              }}
                              className="w-20"
                              inputMode="tel"
                              maxLength={4}
                            />
                            <Input
                              id="fax"
                              placeholder="Enter fax number"
                              value={requestorData.fax}
                              onChange={(e) => {
                                const numericValue = e.target.value.replace(/[^0-9]/g, "")
                                setRequestorData({ ...requestorData, fax: numericValue })
                                if (touched["fax"]) {
                                  validateField("fax", numericValue)
                                }
                              }}
                              onBlur={() => handleBlur("fax", requestorData.fax)}
                              className={`flex-1 ${errors["fax"] ? "border-red-500" : ""}`}
                              inputMode="numeric"
                              maxLength={10}
                            />
                          </div>
                          {errors["fax"] && <p className="text-sm text-red-500 mt-1 break-words">{errors["fax"]}</p>}
                        </div>

                        <div>
                          <Label htmlFor="req-email" className="text-sm text-secondary-font mb-2">
                            B.15 Business Email Address
                          </Label>
                          <Input
                            id="req-email"
                            type="email"
                            placeholder="Enter email address"
                            value={requestorData.email}
                            onChange={(e) => {
                              setRequestorData({ ...requestorData, email: e.target.value })
                              if (touched["req-email"]) {
                                validateField("req-email", e.target.value)
                              }
                            }}
                            onBlur={() => handleBlur("req-email", requestorData.email)}
                            className={`w-full ${errors["req-email"] ? "border-red-500" : ""}`}
                          />
                          {errors["req-email"] && (
                            <p className="text-sm text-red-500 mt-1 break-words">{errors["req-email"]}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-8">
                      {/* Employer Name(s) Section */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-primary-font">Employer Name(s)</h3>
                          {isAutofilled && (
                            <Badge variant="info" className="text-xs">
                              Auto-populated
                            </Badge>
                          )}
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="emp-legal-name" className="text-sm text-primary-font">
                              C.1 Legal Business Name (Ingresa el nombre legal exacto como está registrado con el IRS)
                            </Label>
                            <Input
                              id="emp-legal-name"
                              placeholder="Enter legal business name"
                              value={employerData.legalName}
                              onChange={(e) => {
                                setEmployerData({ ...employerData, legalName: e.target.value })
                                if (touched["emp-legal-name"]) {
                                  validateField("emp-legal-name", e.target.value)
                                }
                              }}
                              onBlur={() => handleBlur("emp-legal-name", employerData.legalName)}
                              className={`w-full ${
                                isAutofilled ? "border-blue-500" : errors["emp-legal-name"] ? "border-red-500" : ""
                              }`}
                            />
                            {errors["emp-legal-name"] && (
                              <p className="text-sm text-red-500 mt-1 break-words">{errors["emp-legal-name"]}</p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="trade-name" className="text-sm text-primary-font">
                              C.2 Trade name/Doing Business As (DBA), if applicable
                            </Label>
                            <Input
                              id="trade-name"
                              placeholder="Enter trade name or DBA"
                              value={employerData.tradeName}
                              onChange={(e) => {
                                setEmployerData({ ...employerData, tradeName: e.target.value })
                                if (touched["trade-name"]) {
                                  validateField("trade-name", e.target.value)
                                }
                              }}
                              onBlur={() => handleBlur("trade-name", employerData.tradeName)}
                              className={`w-full ${
                                isAutofilled ? "border-blue-500" : errors["trade-name"] ? "border-red-500" : ""
                              }`}
                            />
                            {errors["trade-name"] && (
                              <p className="text-sm text-red-500 mt-1 break-words">{errors["trade-name"]}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Address Section */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-primary-font">Address</h3>
                          {isAutofilled && (
                            <Badge variant="info" className="text-xs">
                              Auto-populated
                            </Badge>
                          )}
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="emp-address-1" className="text-sm text-primary-font">
                              C.3 Address 1
                            </Label>
                            <Input
                              id="emp-address-1"
                              placeholder="Enter street address"
                              value={employerData.address1}
                              onChange={(e) => {
                                setEmployerData({ ...employerData, address1: e.target.value })
                                if (touched["emp-address-1"]) {
                                  validateField("emp-address-1", e.target.value)
                                }
                              }}
                              onBlur={() => handleBlur("emp-address-1", employerData.address1)}
                              className={`w-full ${
                                isAutofilled ? "border-blue-500" : errors["emp-address-1"] ? "border-red-500" : ""
                              }`}
                            />
                            {errors["emp-address-1"] && (
                              <p className="text-sm text-red-500 mt-1 break-words">{errors["emp-address-1"]}</p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="address-2" className="text-sm text-primary-font">
                              C.4 Address 2 (apartment/suite/floor and number)
                            </Label>
                            <Input
                              id="address-2"
                              placeholder="Enter apartment, suite, or floor"
                              value={employerData.address2}
                              onChange={(e) => {
                                setEmployerData({ ...employerData, address2: e.target.value })
                                if (touched["address-2"]) {
                                  validateField("address-2", e.target.value)
                                }
                              }}
                              onBlur={() => handleBlur("address-2", employerData.address2)}
                              className={`w-full ${
                                isAutofilled ? "border-blue-500" : errors["address-2"] ? "border-red-500" : ""
                              }`}
                            />
                            {errors["address-2"] && (
                              <p className="text-sm text-red-500 mt-1 break-words">{errors["address-2"]}</p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="emp-city" className="text-sm text-primary-font">
                              C.5 City
                            </Label>
                            <Input
                              id="emp-city"
                              placeholder="Enter city"
                              value={employerData.city}
                              onChange={(e) => {
                                setEmployerData({ ...employerData, city: e.target.value })
                                if (touched["emp-city"]) {
                                  validateField("emp-city", e.target.value)
                                }
                              }}
                              onBlur={() => handleBlur("emp-city", employerData.city)}
                              className={`w-full ${
                                isAutofilled ? "border-blue-500" : errors["emp-city"] ? "border-red-500" : ""
                              }`}
                            />
                            {errors["emp-city"] && (
                              <p className="text-sm text-red-500 mt-1 break-words">{errors["emp-city"]}</p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="emp-state" className="text-sm text-primary-font">
                              C.6 State
                            </Label>
                            <Select
                              value={employerData.state}
                              onValueChange={(value) => {
                                setEmployerData({ ...employerData, state: value })
                                validateField("emp-state", value, "select")
                              }}
                              onOpenChange={(open) => {
                                if (!open && touched["emp-state"]) {
                                  validateField("emp-state", employerData.state, "select")
                                }
                              }}
                            >
                              <SelectTrigger
                                id="emp-state"
                                className={`w-full ${
                                  isAutofilled ? "border-blue-500" : errors["emp-state"] ? "border-red-500" : ""
                                }`}
                              >
                                <SelectValue
                                  placeholder={language === "es" ? "Selecciona una opción" : "Select an option"}
                                />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="california">California</SelectItem>
                                <SelectItem value="texas">Texas</SelectItem>
                                <SelectItem value="florida">Florida</SelectItem>
                                <SelectItem value="newyork">New York</SelectItem>
                              </SelectContent>
                            </Select>
                            {errors["emp-state"] && (
                              <p className="text-sm text-red-500 mt-1 break-words">{errors["emp-state"]}</p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="emp-postal-code" className="text-sm text-primary-font">
                              C.7 Postal Code
                            </Label>
                            <Input
                              id="emp-postal-code"
                              placeholder="Enter postal code"
                              value={employerData.postalCode}
                              onChange={(e) => {
                                const numericValue = e.target.value.replace(/[^0-9]/g, "")
                                setEmployerData({ ...employerData, postalCode: numericValue })
                                if (touched["emp-postal-code"]) {
                                  validateField("emp-postal-code", numericValue)
                                }
                              }}
                              onBlur={() => handleBlur("emp-postal-code", employerData.postalCode)}
                              className={`w-full ${
                                isAutofilled ? "border-blue-500" : errors["emp-postal-code"] ? "border-red-500" : ""
                              }`}
                              inputMode="numeric"
                              maxLength={10}
                            />
                            {errors["emp-postal-code"] && (
                              <p className="text-sm text-red-500 mt-1 break-words">{errors["emp-postal-code"]}</p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="emp-country" className="text-sm text-primary-font">
                              C.8 Country
                            </Label>
                            <Select
                              value={employerData.country}
                              onValueChange={(value) => {
                                setEmployerData({ ...employerData, country: value })
                                validateField("emp-country", value, "select")
                              }}
                              onOpenChange={(open) => {
                                if (!open && touched["emp-country"]) {
                                  validateField("emp-country", employerData.country, "select")
                                }
                              }}
                            >
                              <SelectTrigger
                                id="emp-country"
                                className={`w-full ${
                                  isAutofilled ? "border-blue-500" : errors["emp-country"] ? "border-red-500" : ""
                                }`}
                              >
                                <SelectValue
                                  placeholder={language === "es" ? "Selecciona una opción" : "Select an option"}
                                />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="united-states">United States</SelectItem>
                                <SelectItem value="canada">Canada</SelectItem>
                                <SelectItem value="mexico">Mexico</SelectItem>
                              </SelectContent>
                            </Select>
                            {errors["emp-country"] && (
                              <p className="text-sm text-red-500 mt-1 break-words">{errors["emp-country"]}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Contact Information Section */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-primary-font">Contact Information</h3>
                          {isAutofilled && (
                            <Badge variant="info" className="text-xs">
                              Auto-populated
                            </Badge>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Made contact fields responsive from mobile */}
                          <div className="space-y-2">
                            <Label htmlFor="emp-telephone" className="text-sm text-primary-font">
                              C.10 Telephone Number
                            </Label>
                            <div className="flex gap-2">
                              <Input
                                id="emp-area-code"
                                placeholder="+1"
                                value={employerData.areaCode || ""}
                                onChange={(e) => {
                                  const numericValue = e.target.value.replace(/[^0-9+]/g, "")
                                  setEmployerData({ ...employerData, areaCode: numericValue })
                                }}
                                className={`w-20 ${isAutofilled ? "border-blue-500" : ""}`}
                                inputMode="tel"
                                maxLength={4}
                              />
                              <Input
                                id="emp-telephone"
                                placeholder="Enter phone number"
                                value={employerData.telephone}
                                onChange={(e) => {
                                  const numericValue = e.target.value.replace(/[^0-9]/g, "")
                                  setEmployerData({ ...employerData, telephone: numericValue })
                                  if (touched["emp-telephone"]) {
                                    validateField("emp-telephone", numericValue)
                                  }
                                }}
                                onBlur={() => handleBlur("emp-telephone", employerData.telephone)}
                                className={`flex-1 ${
                                  isAutofilled ? "border-blue-500" : errors["emp-telephone"] ? "border-red-500" : ""
                                }`}
                                inputMode="numeric"
                                maxLength={10}
                              />
                            </div>
                            {errors["emp-telephone"] && (
                              <p className="text-sm text-red-500 mt-1 break-words">{errors["emp-telephone"]}</p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="emp-extension" className="text-sm text-primary-font">
                              C.11 Extension
                            </Label>
                            <Input
                              id="emp-extension"
                              placeholder="Enter extension"
                              value={employerData.extension}
                              onChange={(e) => {
                                const numericValue = e.target.value.replace(/[^0-9]/g, "")
                                setEmployerData({ ...employerData, extension: numericValue })
                                if (touched["emp-extension"]) {
                                  validateField("emp-extension", numericValue)
                                }
                              }}
                              onBlur={() => handleBlur("emp-extension", employerData.extension)}
                              className={`w-full ${
                                isAutofilled ? "border-blue-500" : errors["emp-extension"] ? "border-red-500" : ""
                              }`}
                              inputMode="numeric"
                              maxLength={6}
                            />
                            {errors["emp-extension"] && (
                              <p className="text-sm text-red-500 mt-1 break-words">{errors["emp-extension"]}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Employer Identifiers Section */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-primary-font">Employer Identifiers</h3>
                          {isAutofilled && (
                            <Badge variant="info" className="text-xs">
                              Auto-populated
                            </Badge>
                          )}
                        </div>

                        <Badge
                          variant="default"
                          className="bg-[#FFF8E1] text-[#F57C00] border-[#F57C00] hover:bg-[#FFF8E1]"
                        >
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                          </svg>
                          Review
                        </Badge>

                        <div className="space-y-4 mt-2">
                          <div className="space-y-2">
                            <Label htmlFor="emp-fein" className="text-sm text-primary-font">
                              C.12 Federal Employer Identification Number (FEIN form IRS)
                            </Label>
                            <Input
                              id="emp-fein"
                              placeholder="Enter FEIN"
                              value={employerData.fein}
                              onChange={(e) => {
                                setEmployerData({ ...employerData, fein: e.target.value })
                                if (touched["emp-fein"]) {
                                  validateField("emp-fein", e.target.value)
                                }
                              }}
                              onBlur={() => handleBlur("emp-fein", employerData.fein)}
                              className={`w-full ${
                                isAutofilled ? "border-blue-500" : errors["emp-fein"] ? "border-red-500" : ""
                              }`}
                            />
                            {errors["emp-fein"] && (
                              <p className="text-sm text-red-500 mt-1 break-words">{errors["emp-fein"]}</p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="emp-naics" className="text-sm text-primary-font">
                              C.13 NAICS Code
                            </Label>
                            <Input
                              id="emp-naics"
                              placeholder="Enter NAICS Code"
                              value={employerData.naicsCode}
                              onChange={(e) => {
                                setEmployerData({ ...employerData, naicsCode: e.target.value })
                                if (touched["emp-naics"]) {
                                  validateField("emp-naics", e.target.value)
                                }
                              }}
                              onBlur={() => handleBlur("emp-naics", employerData.naicsCode)}
                              className={`w-full ${
                                isAutofilled ? "border-blue-500" : errors["emp-naics"] ? "border-red-500" : ""
                              }`}
                            />
                            {errors["emp-naics"] && (
                              <p className="text-sm text-red-500 mt-1 break-words">{errors["emp-naics"]}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div className="space-y-8">
                      {/* Question D.1 */}
                      <div className="space-y-4">
                        <Label className="text-base font-normal text-primary-font">
                          D.1 Is the employer covered by the American Competitiveness and Workforce Improvement Act
                          (ACWIA)?
                        </Label>
                        <RadioGroup
                          value={wageProcessing.d1}
                          onValueChange={(val) => setWageProcessing({ ...wageProcessing, d1: val })}
                          className="grid grid-cols-2 gap-4"
                        >
                          <label
                            htmlFor="d1-yes"
                            className="flex items-center justify-center gap-3 rounded-lg border border-border bg-background-sidebar px-6 py-4 cursor-pointer hover:border-button-primary-default transition-colors has-[:checked]:border-button-primary-default has-[:checked]:bg-blue-50"
                          >
                            <RadioGroupItem value="yes" id="d1-yes" />
                            <span className="text-base">Yes</span>
                          </label>
                          <label
                            htmlFor="d1-no"
                            className="flex items-center justify-center gap-3 rounded-lg border border-border bg-background-sidebar px-6 py-4 cursor-pointer hover:border-button-primary-default transition-colors has-[:checked]:border-button-primary-default has-[:checked]:bg-blue-50"
                          >
                            <RadioGroupItem value="no" id="d1-no" />
                            <span className="text-base">No</span>
                          </label>
                        </RadioGroup>
                      </div>

                      {/* Question D.2 */}
                      <div className="space-y-4">
                        <Label className="text-base font-normal text-primary-font">
                          D.2 Is the position covered by a Collective Bargaining Agreement (CBA)?
                        </Label>
                        <RadioGroup
                          value={wageProcessing.d2}
                          onValueChange={(val) => setWageProcessing({ ...wageProcessing, d2: val })}
                          className="grid grid-cols-2 gap-4"
                        >
                          <label
                            htmlFor="d2-yes"
                            className="flex items-center justify-center gap-3 rounded-lg border border-border bg-background-sidebar px-6 py-4 cursor-pointer hover:border-button-primary-default transition-colors has-[:checked]:border-button-primary-default has-[:checked]:bg-blue-50"
                          >
                            <RadioGroupItem value="yes" id="d2-yes" />
                            <span className="text-base">Yes</span>
                          </label>
                          <label
                            htmlFor="d2-no"
                            className="flex items-center justify-center gap-3 rounded-lg border border-border bg-background-sidebar px-6 py-4 cursor-pointer hover:border-button-primary-default transition-colors has-[:checked]:border-button-primary-default has-[:checked]:bg-blue-50"
                          >
                            <RadioGroupItem value="no" id="d2-no" />
                            <span className="text-base">No</span>
                          </label>
                        </RadioGroup>
                      </div>

                      {/* Question D.3 */}
                      <div className="space-y-4">
                        <Label className="text-base font-normal text-primary-font">
                          D.3 Is the employer requesting consideration of Davis-Bacon (DBA) or McNamara Service Contract
                          (SCA) Acts?
                        </Label>
                        <RadioGroup
                          value={wageProcessing.d3}
                          onValueChange={(val) => setWageProcessing({ ...wageProcessing, d3: val })}
                          className="grid grid-cols-2 gap-4"
                        >
                          <label
                            htmlFor="d3-yes"
                            className="flex items-center justify-center gap-3 rounded-lg border border-border bg-background-sidebar px-6 py-4 cursor-pointer hover:border-button-primary-default transition-colors has-[:checked]:border-button-primary-default has-[:checked]:bg-blue-50"
                          >
                            <RadioGroupItem value="yes" id="d3-yes" />
                            <span className="text-base">Yes</span>
                          </label>
                          <label
                            htmlFor="d3-no"
                            className="flex items-center justify-center gap-3 rounded-lg border border-border bg-background-sidebar px-6 py-4 cursor-pointer hover:border-button-primary-default transition-colors has-[:checked]:border-button-primary-default has-[:checked]:bg-blue-50"
                          >
                            <RadioGroupItem value="no" id="d3-no" />
                            <span className="text-base">No</span>
                          </label>
                        </RadioGroup>
                      </div>

                      {/* Question D.4 */}
                      <div className="space-y-4">
                        <Label className="text-base font-normal text-primary-font">
                          D.4 Is the employer requesting consideration of a survey in determining the prevailing wage?
                        </Label>
                        <RadioGroup
                          value={wageProcessing.d4}
                          onValueChange={(val) => setWageProcessing({ ...wageProcessing, d4: val })}
                          className="grid grid-cols-2 gap-4"
                        >
                          <label
                            htmlFor="d4-yes"
                            className="flex items-center justify-center gap-3 rounded-lg border border-border bg-background-sidebar px-6 py-4 cursor-pointer hover:border-button-primary-default transition-colors has-[:checked]:border-button-primary-default has-[:checked]:bg-blue-50"
                          >
                            <RadioGroupItem value="yes" id="d4-yes" />
                            <span className="text-base">Yes</span>
                          </label>
                          <label
                            htmlFor="d4-no"
                            className="flex items-center justify-center gap-3 rounded-lg border border-border bg-background-sidebar px-6 py-4 cursor-pointer hover:border-button-primary-default transition-colors has-[:checked]:border-button-primary-default has-[:checked]:bg-blue-50"
                          >
                            <RadioGroupItem value="no" id="d4-no" />
                            <span className="text-base">No</span>
                          </label>
                        </RadioGroup>
                      </div>
                    </div>
                  )}

                  {currentStep === 5 && (
                    <div className="space-y-6">
                      {/* E.a.1 Job Title */}
                      <div className="space-y-2">
                        <Label htmlFor="job-title" className="text-sm font-medium text-primary-font">
                          E.a.1 Job Title
                        </Label>
                        <Input
                          id="job-title"
                          value={jobDescription.jobTitle}
                          onChange={(e) => {
                            setJobDescription({ ...jobDescription, jobTitle: e.target.value })
                            if (touched["job-title"]) {
                              validateField("job-title", e.target.value)
                            }
                          }}
                          onBlur={() => handleBlur("job-title", jobDescription.jobTitle)}
                          className="border-[#0045FF] w-full"
                        />
                        {errors["job-title"] && (
                          <p className="text-sm text-red-500 mt-1 break-words">{errors["job-title"]}</p>
                        )}
                      </div>

                      {/* E.a.2 SOC Occupational Code and Title */}
                      <div className="space-y-2">
                        <Label htmlFor="soc-code" className="text-sm font-medium text-primary-font">
                          E.a.2 SOC Occupational Code and Title
                        </Label>
                        <Input
                          id="soc-code"
                          value={jobDescription.socCode}
                          onChange={(e) => {
                            setJobDescription({ ...jobDescription, socCode: e.target.value })
                            if (touched["soc-code"]) {
                              validateField("soc-code", e.target.value)
                            }
                          }}
                          onBlur={() => handleBlur("soc-code", jobDescription.socCode)}
                          placeholder="Type search term here..."
                          className="border-border w-full"
                        />
                        {errors["soc-code"] && (
                          <p className="text-sm text-red-500 mt-1 break-words">{errors["soc-code"]}</p>
                        )}
                      </div>

                      {/* E.a.3 Job title of Supervisor */}
                      <div className="space-y-2">
                        <Label htmlFor="supervisor-title" className="text-sm font-medium text-primary-font">
                          E.a.3 Job title of Supervisor for this Position (if applicable)
                        </Label>
                        <Input id="supervisor-title" className="border-border w-full" />
                      </div>

                      {/* E.a.4 Does this position supervise the work of other employees? */}
                      <div className="space-y-4">
                        <Label className="text-base font-normal text-primary-font">
                          E.a.4 Does this position supervise the work of other employees?
                        </Label>
                        <RadioGroup
                          value={jobDescription.supervisesOthers}
                          onValueChange={(val) => setJobDescription({ ...jobDescription, supervisesOthers: val })}
                          className="grid grid-cols-2 gap-4"
                        >
                          <label
                            htmlFor="supervises-yes"
                            className="flex items-center justify-center gap-3 rounded-lg border border-border bg-background-sidebar px-6 py-4 cursor-pointer hover:border-button-primary-default transition-colors has-[:checked]:border-button-primary-default has-[:checked]:bg-blue-50"
                          >
                            <RadioGroupItem value="yes" id="supervises-yes" />
                            <span className="text-base">Yes</span>
                          </label>
                          <label
                            htmlFor="supervises-no"
                            className="flex items-center justify-center gap-3 rounded-lg border border-border bg-background-sidebar px-6 py-4 cursor-pointer hover:border-button-primary-default transition-colors has-[:checked]:border-button-primary-default has-[:checked]:bg-blue-50"
                          >
                            <RadioGroupItem value="no" id="supervises-no" />
                            <span className="text-base">No</span>
                          </label>
                        </RadioGroup>
                      </div>

                      {/* E.a.5 Job duties */}
                      <div className="space-y-2">
                        <Label htmlFor="job-duties" className="text-sm font-medium text-primary-font">
                          E.a.5 Job duties - Please provide a description of the duties to be performed with as much
                          specificity as possible, including details regarding the areas/fields and/or
                          products/industries involved. A description of the job duties to be performed MUST begin in
                          this space
                        </Label>
                        <Textarea
                          id="job-duties"
                          rows={6}
                          placeholder="Describe the job duties, products/industries involved, and detailed tasks to be performed"
                          value={jobDescription.jobDuties}
                          onChange={(e) => setJobDescription({ ...jobDescription, jobDuties: e.target.value })}
                          className="resize-none w-full break-words"
                        />
                      </div>

                      {/* E.a.6 Will travel be required in order to perform the job duties? */}
                      <div className="space-y-4">
                        <Label className="text-base font-normal text-primary-font">
                          E.a.6 Will travel be required in order to perform the job duties?
                        </Label>
                        <RadioGroup
                          value={jobDescription.travelRequired}
                          onValueChange={(val) => setJobDescription({ ...jobDescription, travelRequired: val })}
                          className="grid grid-cols-2 gap-4"
                        >
                          <label
                            htmlFor="travel-yes"
                            className="flex items-center justify-center gap-3 rounded-lg border border-border bg-background-sidebar px-6 py-4 cursor-pointer hover:border-button-primary-default transition-colors has-[:checked]:border-button-primary-default has-[:checked]:bg-blue-50"
                          >
                            <RadioGroupItem value="yes" id="travel-yes" />
                            <span className="text-base">Yes</span>
                          </label>
                          <label
                            htmlFor="travel-no"
                            className="flex items-center justify-center gap-3 rounded-lg border border-border bg-background-sidebar px-6 py-4 cursor-pointer hover:border-button-primary-default transition-colors has-[:checked]:border-button-primary-default has-[:checked]:bg-blue-50"
                          >
                            <RadioGroupItem value="no" id="travel-no" />
                            <span className="text-base">No</span>
                          </label>
                        </RadioGroup>
                      </div>
                    </div>
                  )}

                  {currentStep === 6 && (
                    <div className="space-y-6">
                      {/* E.b.1 Education */}
                      <div className="space-y-2">
                        <Label htmlFor="education" className="text-base font-normal text-primary-font">
                          E.b.1 Education - Select the minimum level of education required for the position
                        </Label>
                        <Select
                          value={jobRequirements.education}
                          onValueChange={(value) => setJobRequirements({ ...jobRequirements, education: value })}
                        >
                          <SelectTrigger id="education">
                            <SelectValue placeholder="Select education level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="None">None</SelectItem>
                            <SelectItem value="High School">High School</SelectItem>
                            <SelectItem value="Associate">Associate's Degree</SelectItem>
                            <SelectItem value="Bachelor">Bachelor's Degree</SelectItem>
                            <SelectItem value="Master">Master's Degree</SelectItem>
                            <SelectItem value="Doctorate">Doctorate</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* E.b.2 Does the employer require a second U.S. diploma/degree? */}
                      <div className="space-y-4">
                        <Label className="text-base font-normal text-primary-font">
                          E.b.2 Is a second U.S. diploma/degree required?
                        </Label>
                        <RadioGroup
                          value={jobRequirements.secondDiploma}
                          onValueChange={(val) => setJobRequirements({ ...jobRequirements, secondDiploma: val })}
                          className="grid grid-cols-2 gap-4"
                        >
                          <label
                            htmlFor="second-diploma-yes"
                            className="flex items-center justify-center gap-3 rounded-lg border border-border bg-background-sidebar px-6 py-4 cursor-pointer hover:border-button-primary-default transition-colors has-[:checked]:border-button-primary-default has-[:checked]:bg-blue-50"
                          >
                            <RadioGroupItem value="yes" id="second-diploma-yes" />
                            <span className="text-base">Yes</span>
                          </label>
                          <label
                            htmlFor="second-diploma-no"
                            className="flex items-center justify-center gap-3 rounded-lg border border-border bg-background-sidebar px-6 py-4 cursor-pointer hover:border-button-primary-default transition-colors has-[:checked]:border-button-primary-default has-[:checked]:bg-blue-50"
                          >
                            <RadioGroupItem value="no" id="second-diploma-no" />
                            <span className="text-base">No</span>
                          </label>
                        </RadioGroup>
                      </div>

                      {/* E.b.3 Is training for the job opportunity required? */}
                      <div className="space-y-4">
                        <Label className="text-base font-normal text-primary-font">E.b.3 Is training required?</Label>
                        <RadioGroup
                          value={jobRequirements.trainingRequired}
                          onValueChange={(val) => setJobRequirements({ ...jobRequirements, trainingRequired: val })}
                          className="grid grid-cols-2 gap-4"
                        >
                          <label
                            htmlFor="training-yes"
                            className="flex items-center justify-center gap-3 rounded-lg border border-border bg-background-sidebar px-6 py-4 cursor-pointer hover:border-button-primary-default transition-colors has-[:checked]:border-button-primary-default has-[:checked]:bg-blue-50"
                          >
                            <RadioGroupItem value="yes" id="training-yes" />
                            <span className="text-base">Yes</span>
                          </label>
                          <label
                            htmlFor="training-no"
                            className="flex items-center justify-center gap-3 rounded-lg border border-border bg-background-sidebar px-6 py-4 cursor-pointer hover:border-button-primary-default transition-colors has-[:checked]:border-button-primary-default has-[:checked]:bg-blue-50"
                          >
                            <RadioGroupItem value="no" id="training-no" />
                            <span className="text-base">No</span>
                          </label>
                        </RadioGroup>
                      </div>

                      {/* E.b.4 Is employment experience required? */}
                      <div className="space-y-4">
                        <Label className="text-base font-normal text-primary-font">
                          E.b.4 Experience Required - If required, indicate the number of months of experience required
                          and the occupation in which the experience must be obtained
                        </Label>
                        <Input
                          id="experience-required"
                          placeholder="e.g., 6 Months, Restaurant Manager"
                          value={jobRequirements.experienceRequired}
                          onChange={(e) =>
                            setJobRequirements({ ...jobRequirements, experienceRequired: e.target.value })
                          }
                          className="w-full"
                        />
                      </div>

                      {/* E.b.5 Special Requirements */}
                      <div className="space-y-2">
                        <Label htmlFor="special-requirements" className="text-base font-normal text-primary-font">
                          E.b.5 Special Requirements - List specific skills, licenses/certificates/certifications and
                          requirements of the job opportunity.
                        </Label>
                        <Textarea
                          id="special-requirements"
                          placeholder="List any special skills, licenses, certifications, or other requirements"
                          value={jobRequirements.specialRequirements}
                          onChange={(e) =>
                            setJobRequirements({ ...jobRequirements, specialRequirements: e.target.value })
                          }
                          className="min-h-[120px] resize-none w-full break-words"
                        />
                      </div>
                    </div>
                  )}

                  {currentStep === 7 && (
                    <div className="space-y-6">
                      {/* E.c.1: Worksite Address */}
                      <div className="space-y-2">
                        <Label htmlFor="worksite-city" className="text-sm font-medium text-primary-font">
                          E.c.1: City
                        </Label>
                        <Input
                          id="worksite-city"
                          value={placeOfEmployment.city}
                          onChange={(e) => {
                            setPlaceOfEmployment({ ...placeOfEmployment, city: e.target.value })
                            if (touched["worksite-city"]) {
                              validateField("worksite-city", e.target.value)
                            }
                          }}
                          onBlur={() => handleBlur("worksite-city", placeOfEmployment.city)}
                          placeholder="Enter city name"
                          className={`w-full ${errors["worksite-city"] ? "border-red-500" : ""}`}
                        />
                        {errors["worksite-city"] && (
                          <p className="text-sm text-red-500 mt-1 break-words">{errors["worksite-city"]}</p>
                        )}
                      </div>

                      {/* E.c.2: Worksite Address */}
                      <div className="space-y-2">
                        <Label htmlFor="worksite-address-2" className="text-sm font-medium text-primary-font">
                          E.c.2: Address 2 (apartment/suite/floor and number)
                        </Label>
                        <Input
                          id="worksite-address-2"
                          placeholder="Enter apartment, suite, unit, etc."
                          className="w-full"
                        />
                      </div>

                      {/* E.c.4: State - Connected to placeOfEmployment.state */}
                      <div className="space-y-2">
                        <Label htmlFor="worksite-state" className="text-sm font-medium text-primary-font">
                          E.c.4: State/District/Territory
                        </Label>
                        <Select
                          value={placeOfEmployment.state}
                          onValueChange={(value) => {
                            setPlaceOfEmployment({ ...placeOfEmployment, state: value })
                            if (touched["worksite-state"]) {
                              validateField("worksite-state", value, "select")
                            }
                          }}
                        >
                          <SelectTrigger
                            id="worksite-state"
                            className={`w-full ${errors["worksite-state"] ? "border-red-500" : ""}`}
                            onBlur={() => handleBlur("worksite-state", placeOfEmployment.state, "select")}
                          >
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="california">California</SelectItem>
                            <SelectItem value="texas">Texas</SelectItem>
                            <SelectItem value="florida">Florida</SelectItem>
                            <SelectItem value="new-york">New York</SelectItem>
                            <SelectItem value="arizona">Arizona</SelectItem>
                            <SelectItem value="washington">Washington</SelectItem>
                            <SelectItem value="oregon">Oregon</SelectItem>
                            <SelectItem value="nevada">Nevada</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors["worksite-state"] && (
                          <p className="text-sm text-red-500 mt-1 break-words">{errors["worksite-state"]}</p>
                        )}
                      </div>

                      {/* E.c.5: County */}
                      <div className="space-y-2">
                        <Label htmlFor="worksite-county" className="text-sm font-medium text-primary-font">
                          E.c.5: County
                        </Label>
                        <Input
                          id="worksite-county"
                          value={placeOfEmployment.county}
                          onChange={(e) => {
                            setPlaceOfEmployment({ ...placeOfEmployment, county: e.target.value })
                            if (touched["worksite-county"]) {
                              validateField("worksite-county", e.target.value)
                            }
                          }}
                          onBlur={() => handleBlur("worksite-county", placeOfEmployment.county)}
                          placeholder="Enter county name"
                          className={`w-full ${errors["worksite-county"] ? "border-red-500" : ""}`}
                        />
                        {errors["worksite-county"] && (
                          <p className="text-sm text-red-500 mt-1 break-words">{errors["worksite-county"]}</p>
                        )}
                      </div>

                      {/* E.c.6: Postal Code */}
                      <div className="space-y-2">
                        <Label htmlFor="worksite-postal" className="text-sm font-medium text-primary-font">
                          E.c.6: Postal code
                        </Label>
                        <Input
                          id="worksite-postal"
                          value={placeOfEmployment.postalCode}
                          onChange={(e) => {
                            setPlaceOfEmployment({ ...placeOfEmployment, postalCode: e.target.value })
                            if (touched["worksite-postal"]) {
                              validateField("worksite-postal", e.target.value)
                            }
                          }}
                          onBlur={() => handleBlur("worksite-postal", placeOfEmployment.postalCode)}
                          placeholder="Enter postal code"
                          className={`w-full ${errors["worksite-postal"] ? "border-red-500" : ""}`}
                        />
                        {errors["worksite-postal"] && (
                          <p className="text-sm text-red-500 mt-1 break-words">{errors["worksite-postal"]}</p>
                        )}
                      </div>

                      {/* E.c.7 Will work be performed in multiple worksites */}
                      <div className="space-y-4">
                        <Label className="text-base font-normal text-primary-font">
                          E.c.7 Will work be performed in multiple worksites within an area of intended employment or a
                          location(s) other than the address listed above?
                        </Label>
                        <RadioGroup
                          value={placeOfEmployment.multipleWorksites}
                          onValueChange={(val) =>
                            setPlaceOfEmployment({ ...placeOfEmployment, multipleWorksites: val })
                          }
                          className="grid grid-cols-2 gap-4"
                        >
                          <label
                            htmlFor="multiple-yes"
                            className="flex items-center justify-center gap-3 rounded-lg border border-border bg-background-sidebar px-6 py-4 cursor-pointer hover:border-button-primary-default transition-colors has-[:checked]:border-button-primary-default has-[:checked]:bg-blue-50"
                          >
                            <RadioGroupItem value="yes" id="multiple-yes" />
                            <span className="text-base">Yes</span>
                          </label>
                          <label
                            htmlFor="multiple-no"
                            className="flex items-center justify-center gap-3 rounded-lg border border-border bg-background-sidebar px-6 py-4 cursor-pointer hover:border-button-primary-default transition-colors has-[:checked]:border-button-primary-default has-[:checked]:bg-blue-50"
                          >
                            <RadioGroupItem value="no" id="multiple-no" />
                            <span className="text-base">No</span>
                          </label>
                        </RadioGroup>
                      </div>
                    </div>
                  )}

                  {currentStep === 8 && (
                    <div className="space-y-6">
                      {/* Info Alert */}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex gap-3">
                          <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-blue-900 mb-2">Info</h4>
                            <p className="text-sm text-blue-800 leading-relaxed">
                              Identify the geographic place(s) of employment indicating each metropolitan statistical
                              area (MSA) or the independent city(ies)/township(s)/county(ies) (boroughs)/parish(es)) and
                              the corresponding state(s) where work will be performed. If necessary, submit a second
                              completed Form ETA-9141 with a listing of the additional anticipated worksites. Please
                              note that wages cannot be provided for unspecified/unspecified locations.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Worksites Section */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-primary-font">
                            {additionalWorksites.length} Additional worksite
                            {additionalWorksites.length !== 1 ? "s" : ""}
                          </h3>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={openWorksiteDialog}
                            className="flex items-center gap-2 bg-transparent"
                          >
                            <Plus className="h-4 w-4" />
                            Add Worksite
                          </Button>
                        </div>

                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="whitespace-nowrap">City</TableHead>
                                <TableHead className="whitespace-nowrap">State</TableHead>
                                <TableHead className="whitespace-nowrap">Country</TableHead>
                                <TableHead className="whitespace-nowrap">Metropolitan Statistical Area</TableHead>
                                <TableHead className="whitespace-nowrap">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {additionalWorksites.map((worksite) => (
                                <TableRow key={worksite.id} className="hover:bg-[#E7F6FF]">
                                  <TableCell className="whitespace-nowrap">{worksite.city || "-"}</TableCell>
                                  <TableCell className="whitespace-nowrap">{worksite.state || "-"}</TableCell>
                                  <TableCell className="whitespace-nowrap">{worksite.country || "-"}</TableCell>
                                  <TableCell className="whitespace-nowrap">{worksite.metropolitan || "-"}</TableCell>
                                  <TableCell className="whitespace-nowrap">
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                          <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => editWorksite(worksite)}>
                                          <Edit className="mr-2 h-4 w-4" />
                                          Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                          className="text-destructive"
                                          onClick={() => deleteWorksite(worksite.id)}
                                        >
                                          <Trash2 className="mr-2 h-4 w-4" />
                                          Delete
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 9 && (
                    <div className="space-y-6">
                      {/* Info Alert */}
                      <Alert className="border-[#1976D2] bg-[#E3F2FD]">
                        <Info className="h-5 w-5 text-[#1976D2]" />
                        <AlertDescription className="text-[#1E3A5F] text-sm">
                          Below, you will find a summary of documents that you have uploaded to this application
                          throughout the form. You may also add and categorize additional supplemental documents below.
                        </AlertDescription>
                      </Alert>

                      {/* Additional Documents Section */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-primary-font">
                            {additionalDocuments.length} Additional Documents
                          </h3>
                          <Dialog open={isDocumentDialogOpen} onOpenChange={setIsDocumentDialogOpen}>
                            <DialogTrigger asChild>
                              <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => {
                                  setEditingDocumentIndex(null)
                                  setNewDocument({ name: "", category: "" })
                                }}
                              >
                                <Plus className="h-4 w-4 mr-2" />
                                Add Document
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>
                                  {editingDocumentIndex !== null ? "Edit Document" : "Add Document"}
                                </DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                  <Label htmlFor="doc-name">Document Name</Label>
                                  <Input
                                    id="doc-name"
                                    value={newDocument.name}
                                    onChange={(e) => setNewDocument({ ...newDocument, name: e.target.value })}
                                    placeholder="Enter document name"
                                    className="w-full"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="doc-category">Category</Label>
                                  <Input
                                    id="doc-category"
                                    value={newDocument.category}
                                    onChange={(e) => setNewDocument({ ...newDocument, category: e.target.value })}
                                    placeholder="Enter category"
                                    className="w-full"
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button variant="outline" onClick={() => setIsDocumentDialogOpen(false)}>
                                  Cancel
                                </Button>
                                <Button onClick={handleAddDocument}>
                                  {editingDocumentIndex !== null ? "Update" : "Add"}
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>

                        <p className="text-sm text-tertiary-font">
                          You can modify documents which were added in previous application sections by returning to
                          those sections.
                        </p>

                        {/* Documents Table */}
                        <div className="border rounded-lg overflow-hidden">
                          <Table>
                            <TableHeader>
                              <TableRow className="bg-[#F8FAFC] hover:bg-[#F8FAFC]">
                                <TableHead className="font-semibold text-primary-font whitespace-nowrap">
                                  Document Name
                                </TableHead>
                                <TableHead className="font-semibold text-primary-font whitespace-nowrap">
                                  Category
                                </TableHead>
                                <TableHead className="font-semibold text-primary-font whitespace-nowrap text-right">
                                  Actions
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {additionalDocuments.length === 0 ? (
                                <TableRow className="hover:bg-[#F8FAFC]">
                                  <TableCell colSpan={3} className="text-center py-8 text-tertiary-font">
                                    No documents added yet
                                  </TableCell>
                                </TableRow>
                              ) : (
                                additionalDocuments.map((doc, index) => (
                                  <TableRow key={index} className="hover:bg-[#E7F6FF]">
                                    <TableCell className="whitespace-nowrap">{doc.name}</TableCell>
                                    <TableCell className="whitespace-nowrap">{doc.category}</TableCell>
                                    <TableCell className="text-right whitespace-nowrap">
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button variant="ghost" size="icon">
                                            <MoreVertical className="h-4 w-4" />
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                          <DropdownMenuItem onClick={() => handleEditDocument(index)}>
                                            <Pencil className="h-4 w-4 mr-2" />
                                            Edit
                                          </DropdownMenuItem>
                                          <DropdownMenuItem
                                            onClick={() => handleDeleteDocument(index)}
                                            className="text-destructive"
                                          >
                                            <Trash2 className="h-4 w-4 mr-2" />
                                            Delete
                                          </DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </TableCell>
                                  </TableRow>
                                ))
                              )}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 10 && (
                    <div className="space-y-6">
                      {/* Important Alert */}
                      <Alert className="bg-[#FFF8E1] border-[#F57C00] text-[#5D4037]">
                        <AlertCircle className="h-4 w-4 text-[#F57C00]" />
                        <AlertTitle className="text-[#5D4037] font-semibold">Important</AlertTitle>
                        <AlertDescription className="text-[#5D4037]">
                          Carefully review all information before submitting. Once submitted to the FLAG system, you
                          will not be able to make changes without contacting the Department of Labor.
                        </AlertDescription>
                      </Alert>

                      {/* Employer Information Summary */}
                      <div className="bg-white border border-border rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold">Employer Information</h3>
                          {validationRequested && (
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500">
                              <Check className="h-4 w-4 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="space-y-3">
                          <div className="flex">
                            <div className="w-48 text-sm text-muted-foreground">Legal Name</div>
                            <div className="flex-1 text-sm font-medium">
                              {employerData.legalName}
                              <div className="text-muted-foreground font-normal">
                                {employerData.address1}, {employerData.city}, {employerData.state}{" "}
                                {employerData.postalCode}
                              </div>
                            </div>
                          </div>
                          <div className="flex">
                            <div className="w-48 text-sm text-muted-foreground">FEIN</div>
                            <div className="flex-1 text-sm font-medium">{employerData.fein}</div>
                          </div>
                          <div className="flex">
                            <div className="w-48 text-sm text-muted-foreground">Telephone Number</div>
                            <div className="flex-1 text-sm font-medium">{employerData.telephone}</div>
                          </div>
                          <div className="flex">
                            <div className="w-48 text-sm text-muted-foreground">Contact</div>
                            <div className="flex-1 text-sm font-medium">{employerData.contact}</div>
                          </div>
                          <div className="flex">
                            <div className="w-48 text-sm text-muted-foreground">Email Contact</div>
                            <div className="flex-1 text-sm font-medium">{employerData.email}</div>
                          </div>
                        </div>
                      </div>

                      {/* Job Information Summary */}
                      <div className="bg-white border border-border rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold">Job Information</h3>
                          {validationRequested && (
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500">
                              <Check className="h-4 w-4 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="space-y-3">
                          <div className="flex">
                            <div className="w-48 text-sm text-muted-foreground">Visa Type</div>
                            <div className="flex-1 text-sm font-medium">{jobDescription.visaType}</div>
                          </div>
                          <div className="flex">
                            <div className="w-48 text-sm text-muted-foreground">Job Title</div>
                            <div className="flex-1 text-sm font-medium">{jobDescription.jobTitle}</div>
                          </div>
                          <div className="flex">
                            <div className="w-48 text-sm text-muted-foreground">Job Task Description</div>
                            <div className="flex-1 text-sm font-medium">{jobDescription.taskDescription}</div>
                          </div>
                          <div className="flex">
                            <div className="w-48 text-sm text-muted-foreground">SOC Code</div>
                            <div className="flex-1 text-sm font-medium">{jobDescription.socCode}</div>
                          </div>
                          <div className="flex">
                            <div className="w-48 text-sm text-muted-foreground">Place of Work</div>
                            <div className="flex-1 text-sm font-medium">
                              {jobDescription.workCity}, {jobDescription.workState}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Minimum Job Requirements Summary */}
                      <div className="bg-white border border-border rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold">Minimum Job Requirements</h3>
                          {validationRequested && (
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500">
                              <Check className="h-4 w-4 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="space-y-3">
                          <div className="flex">
                            <div className="w-48 text-sm text-muted-foreground">Education</div>
                            <div className="flex-1 text-sm font-medium">{jobRequirements.education || "None"}</div>
                          </div>
                          <div className="flex">
                            <div className="w-48 text-sm text-muted-foreground">Second U.S. diploma/degree</div>
                            <div className="flex-1 text-sm font-medium">
                              {jobRequirements.secondDiploma === "no" ? "No" : "Yes"}
                            </div>
                          </div>
                          <div className="flex">
                            <div className="w-48 text-sm text-muted-foreground">Training required</div>
                            <div className="flex-1 text-sm font-medium">
                              {jobRequirements.trainingRequired === "no" ? "No" : "Yes"}
                            </div>
                          </div>
                          <div className="flex">
                            <div className="w-48 text-sm text-muted-foreground">Experience required</div>
                            <div className="flex-1 text-sm font-medium">
                              {jobRequirements.experienceRequired || "No"}
                            </div>
                          </div>
                          <div className="flex">
                            <div className="w-48 text-sm text-muted-foreground">Special Requirements</div>
                            <div className="flex-1 text-sm font-medium">
                              {jobRequirements.specialRequirements || "No"}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Additional Worksites Summary */}
                      <div className="bg-white border border-border rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold">Additional Worksites</h3>
                          {validationRequested && (
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500">
                              <Check className="h-4 w-4 text-white" />
                            </div>
                          )}
                        </div>
                        {additionalWorksites.length > 0 && (
                          <div className="space-y-3 mb-4 last:mb-0">
                            {additionalWorksites.map((worksite, index) => (
                              <div key={index} className="space-y-3">
                                <div className="flex">
                                  <div className="w-48 text-sm text-muted-foreground">City</div>
                                  <div className="flex-1 text-sm font-medium">{worksite.city}</div>
                                </div>
                                <div className="flex">
                                  <div className="w-48 text-sm text-muted-foreground">State</div>
                                  <div className="flex-1 text-sm font-medium">{worksite.state}</div>
                                </div>
                                <div className="flex">
                                  <div className="w-48 text-sm text-muted-foreground">Country</div>
                                  <div className="flex-1 text-sm font-medium">{worksite.country || "-"}</div>
                                </div>
                                <div className="flex">
                                  <div className="w-48 text-sm text-muted-foreground">
                                    Metropolitan Statistical Area
                                  </div>
                                  <div className="flex-1 text-sm font-medium">{worksite.metropolitan || "-"}</div>
                                </div>
                                {index < additionalWorksites.length - 1 && (
                                  <div className="border-t border-border my-3" />
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="space-y-6">
                        {/* Checklist Section */}
                        {!validationRequested && (
                          <div className="bg-white border-border rounded-none border-0">
                            <h3 className="text-base font-semibold mb-4">Form validation</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                              Send the form validation request to the employer.
                            </p>
                            <div className="space-y-3">
                              <div className="flex items-center space-x-2 text-sm text-muted-foreground cursor-pointer">
                                <Checkbox
                                  checked={validationChecklist.visaInfo}
                                  onCheckedChange={() => handleChecklistChange("visaInfo")}
                                />
                                <span onClick={() => handleChecklistChange("visaInfo")}>
                                  Employment-Based Visa Information
                                </span>
                              </div>
                              <div className="flex items-center space-x-2 text-sm text-muted-foreground cursor-pointer">
                                <Checkbox
                                  checked={validationChecklist.requestorInfo}
                                  onCheckedChange={() => handleChecklistChange("requestorInfo")}
                                />
                                <span onClick={() => handleChecklistChange("requestorInfo")}>
                                  Requestor Point-of-Contact Information
                                </span>
                              </div>
                              <div className="flex items-center space-x-2 text-sm text-muted-foreground cursor-pointer">
                                <Checkbox
                                  checked={validationChecklist.employerInfo}
                                  onCheckedChange={() => handleChecklistChange("employerInfo")}
                                />
                                <span onClick={() => handleChecklistChange("employerInfo")}>Employer Information</span>
                              </div>
                              <div className="flex items-center space-x-2 text-sm text-muted-foreground cursor-pointer">
                                <Checkbox
                                  checked={validationChecklist.wageProcessing}
                                  onCheckedChange={() => handleChecklistChange("wageProcessing")}
                                />
                                <span onClick={() => handleChecklistChange("wageProcessing")}>
                                  Wage Processing Information
                                </span>
                              </div>
                              <div className="flex items-center space-x-2 text-sm text-muted-foreground cursor-pointer">
                                <Checkbox
                                  checked={validationChecklist.jobDescription}
                                  onCheckedChange={() => handleChecklistChange("jobDescription")}
                                />
                                <span onClick={() => handleChecklistChange("jobDescription")}>Job Description</span>
                              </div>
                              <div className="flex items-center space-x-2 text-sm text-muted-foreground cursor-pointer">
                                <Checkbox
                                  checked={validationChecklist.jobRequirements}
                                  onCheckedChange={() => handleChecklistChange("jobRequirements")}
                                />
                                <span onClick={() => handleChecklistChange("jobRequirements")}>Job Requirements</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Form Validation by Employer (shown after request) */}
                        {validationRequested && (
                          <div className="pt-6 border-t border-border space-y-6">
                            <h3 className="text-xl font-semibold">Form validation by Employer</h3>

                            <p className="text-sm text-muted-foreground">[{employerData.legalName}] signed off.</p>

                            <div className="flex items-start space-x-3">
                              <Checkbox
                                id="employer-certification"
                                checked={employerCertified}
                                onCheckedChange={(checked) => setEmployerCertified(checked as boolean)}
                                className="mt-1 cursor-pointer"
                              />
                              <Label
                                htmlFor="employer-certification"
                                className="text-sm font-normal leading-relaxed cursor-pointer"
                              >
                                I certify that all information provided is true and accurate to the best of my
                                knowledge. I understand that providing false information may result in legal
                                consequences.
                              </Label>
                            </div>

                            <Alert className="bg-[#E3F2FD] border-[#2196F3]">
                              <Info className="h-4 w-4 text-[#1976D2]" />
                              <AlertTitle className="text-[#1565C0] font-semibold">
                                Ready to submit to the Department of Labor's FLAG system
                              </AlertTitle>
                              <AlertDescription className="text-[#1565C0]">
                                Once submitted, you will receive a PWD tracking number. Processing typically takes 7-10
                                business days.
                              </AlertDescription>
                            </Alert>
                          </div>
                        )}

                        {!validationRequested && (
                          <div>
                            <Label htmlFor="employer-message" className="text-sm font-medium mb-2">
                              Message for employer
                            </Label>
                            <Textarea
                              id="employer-message"
                              placeholder="Please review the completed ETA-9141 form. Pay special attention to Part 1 (your company information) and Part 4 (job details). If everything looks correct, please approve so we can submit to USCIS."
                              className="min-h-[120px] mt-2 w-full break-words"
                              defaultValue="Please review the completed ETA-9141 form. Pay special attention to Part 1 (your company information) and Part 4 (job details). If everything looks correct, please approve so we can submit to USCIS."
                            />

                            <div className="flex justify-end mt-4">
                              <Button
                                variant="link"
                                className="text-blue-600 p-0 h-auto font-normal"
                                onClick={() => setValidationRequested(true)}
                              >
                                Request validation
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>

                      {!validationRequested && (
                        <div className="pt-6 border-t border-border">
                          <h3 className="text-base font-semibold mb-2">FLAG authentication</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Share credentials with Zipmi to complete the connection setup
                          </p>

                          <Button
                            variant="outline"
                            className="w-full sm:w-auto bg-transparent"
                            onClick={() => setIsFlagAuthDialogOpen(true)}
                          >
                            <SettingsIcon className="mr-2 h-4 w-4" />
                            FLAG Authentication
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Navigation Buttons at bottom of content */}
                <div className="border-t border-border pt-6 mt-8">
                  <div className="flex items-center justify-between gap-4">
                    <Button variant="secondary" onClick={handlePrevious} disabled={currentStep === 1} className="gap-2">
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    <Button
                      onClick={() => {
                        if (currentStep === 10) {
                          console.log("Submitting to FLAG")
                          setIsSubmissionSuccessOpen(true)
                        } else {
                          handleNextStep()
                        }
                      }}
                      disabled={currentStep === formSections.length && !employerCertified} // Disable submit if not certified on step 10
                      className="gap-2"
                    >
                      {currentStep === 10 && validationRequested ? "Submit to FLAG" : "Next"}
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Worksite Dialog */}
      <Dialog open={isWorksiteDialogOpen} onOpenChange={setIsWorksiteDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingWorksiteId ? "Edit Worksite" : "Add Worksite"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="worksite-city">City</Label>
              <Input
                id="worksite-city"
                placeholder="Enter city name"
                value={worksiteForm.city}
                onChange={(e) => setWorksiteForm({ ...worksiteForm, city: e.target.value })}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="worksite-state">State</Label>
              <Input
                id="worksite-state"
                placeholder="Enter state"
                value={worksiteForm.state}
                onChange={(e) => setWorksiteForm({ ...worksiteForm, state: e.target.value })}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="worksite-country">Country</Label>
              <Input
                id="worksite-country"
                placeholder="Enter country"
                value={worksiteForm.country}
                onChange={(e) => setWorksiteForm({ ...worksiteForm, country: e.target.value })}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="worksite-msa">Metropolitan Statistical Area</Label>
              <Input
                id="worksite-msa"
                placeholder="Enter MSA"
                value={worksiteForm.metropolitan}
                onChange={(e) => setWorksiteForm({ ...worksiteForm, metropolitan: e.target.value })}
                className="w-full"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsWorksiteDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveWorksite}>{editingWorksiteId ? "Update" : "Add"} Worksite</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* FLAG Authentication Dialog */}
      <Dialog open={isFlagAuthDialogOpen} onOpenChange={setIsFlagAuthDialogOpen}>
        <DialogContent className="sm:max-w-[720px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">FLAG Authentication Setup</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <p className="text-base font-medium text-foreground">Share these credentials with your administrator:</p>

            {/* FLAG Email - Read only display */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-foreground">FLAG Email</Label>
              <p className="text-base text-foreground">user_agent_21321@zipmi.ai</p>
            </div>

            {/* FLAG Password with Save button inline */}
            <div className="space-y-2">
              <Label htmlFor="flag-password" className="text-sm font-semibold text-foreground">
                FLAG Password
              </Label>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Input
                    id="flag-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={flagPassword}
                    onChange={(e) => setFlagPassword(e.target.value)}
                    className="pr-10 w-full"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
                <Button className="px-8">Save</Button>
              </div>
            </div>

            {/* Authentication Code */}
            <div className="space-y-2">
              <Label htmlFor="auth-code" className="text-sm font-semibold text-foreground">
                Authentication code
              </Label>
              <Input
                id="auth-code"
                placeholder="Enter Authentication code"
                value={flagAuthCode}
                onChange={(e) => setFlagAuthCode(e.target.value)}
                className="w-full"
              />
            </div>

            <Alert className="bg-amber-50 border-amber-300">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertTitle className="text-amber-900 font-semibold">Important</AlertTitle>
              <AlertDescription className="text-amber-800">
                After setup, don't change your FLAG password or MFA settings. This will disconnect Zipmi.
              </AlertDescription>
            </Alert>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isSubmissionSuccessOpen} onOpenChange={setIsSubmissionSuccessOpen}>
        <DialogContent className="sm:max-w-[720px] p-0 gap-0">
          <div className="p-6">
            {/* Success banner with green background */}
            <div className="bg-green-50 border-2 border-green-500 rounded-lg p-8 text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="h-6 w-6 text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Certification submitted to DOL</h2>
              <p className="text-base text-gray-700">
                Your H-2B application is now under review by the Department of Labor.
              </p>
            </div>

            <Alert className="mt-6 bg-gray-50 border-gray-200">
              <InfoIcon className="h-5 w-5 text-gray-600" />
              <AlertDescription className="text-base text-gray-700">
                You'll receive a case number via email within 24 hours. We'll notify you with status updates throughout
                the process.
              </AlertDescription>
            </Alert>

            {/* Go to dashboard button */}
            <div className="flex justify-center pt-6">
              <Button
                onClick={() => {
                  setIsSubmissionSuccessOpen(false)
                  router.push(`/?submitted=true&certId=${certificationId}&section=certifications`)
                }}
                className="px-8"
              >
                Go to dashboard
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
