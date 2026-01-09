"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea" // Fixed typo in import path from 'textare' to 'textarea'
import {
  BadgeCheckIcon,
  CalendarIcon,
  MessageCircleIcon,
  MoreHorizontal,
  UsersIcon,
  UserIcon,
  LayoutDashboardIcon,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Bell,
  Globe,
  Menu,
  X,
  Info,
  Upload,
  AlertCircle,
  Clock,
  Plane,
  List,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert } from "@/components/ui/alert"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

import { useLanguage } from "@/contexts/language-context"

export default function Dashboard() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("dashboard")
  const { language, setLanguage, t } = useLanguage()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [showAddCertificationPanel, setShowAddCertificationPanel] = useState(false)
  // Removed: const [showCertificationDetail, setShowCertificationDetail] = useState(false)
  // Removed: const [selectedCertification, setSelectedCertification] = useState<any>(null)

  const [certificationsView, setCertificationsView] = useState<"kanban" | "list">("kanban")
  const [viewMode, setViewMode] = useState<"kanban" | "list">("kanban") // Added for view toggle

  const [criticalTasks, setCriticalTasks] = useState([
    {
      id: 1,
      name: "Submit ETA-9141 Form",
      deadline: "2025-01-05",
      company: "Peterson Yards Inc.",
      urgent: true,
      completed: false,
    },
    {
      id: 2,
      name: "Review Labor Certification",
      deadline: "2025-01-08",
      company: "Tech Solutions Inc.",
      urgent: true,
      completed: false,
    },
    {
      id: 3,
      name: "Prepare Recruitment Report",
      deadline: "2025-01-15",
      company: "Global Corp",
      urgent: false,
      completed: false,
    },
    {
      id: 4,
      name: "File I-129 Petition",
      deadline: "2025-01-20",
      company: "Design Studio",
      urgent: false,
      completed: false,
    },
  ])

  const [kanbanData, setKanbanData] = useState({
    prevailingWage: [
      { id: 1, employer: "Peterson Yards Inc.", deadline: "2025-01-10" },
      { id: 2, employer: "Tech Solutions Inc.", deadline: "2025-01-12" },
      { id: 3, employer: "Global Corp", deadline: "2025-01-15" },
    ],
    laborCertification: [
      { id: 4, employer: "Design Studio", deadline: "2025-01-18" },
      { id: 5, employer: "Sales Corp", deadline: "2025-01-20" },
    ],
    i129Petition: [
      { id: 6, employer: "Innovation Labs", deadline: "2025-01-25" },
      { id: 7, employer: "Marketing Group", deadline: "2025-01-28" },
    ],
  })

  const [foreignProcessData] = useState([
    {
      employerId: 1,
      employerName: "Peterson Yards Inc.",
      jobs: [
        {
          id: 1,
          jobTitle: "Farm Worker, General",
          anticipatedStartDate: "2025-02-15",
          caseManager: { name: "Sarah Johnson", photo: "/placeholder.svg?height=40&width=40" },
          statusBadges: ["Recruiting", "Job offer"],
        },
        {
          id: 2,
          jobTitle: "Agricultural Equipment Operator",
          anticipatedStartDate: "2025-03-01",
          caseManager: { name: "Michael Chen", photo: "/placeholder.svg?height=40&width=40" },
          statusBadges: ["DS-160", "Consular appointment"],
        },
        {
          id: 3,
          jobTitle: "Harvest Supervisor",
          anticipatedStartDate: "2025-03-15",
          caseManager: { name: "Emily Rodriguez", photo: "/placeholder.svg?height=40&width=40" },
          statusBadges: ["Travel Logistics", "On site"],
        },
      ],
    },
    {
      employerId: 2,
      employerName: "Tech Solutions Inc.",
      jobs: [
        {
          id: 4,
          jobTitle: "Software Engineer",
          anticipatedStartDate: "2025-04-01",
          caseManager: { name: "David Kim", photo: "/placeholder.svg?height=40&width=40" },
          statusBadges: ["Recruiting", "DS-160"],
        },
        {
          id: 5,
          jobTitle: "Product Manager",
          anticipatedStartDate: "2025-04-15",
          caseManager: { name: "Sarah Johnson", photo: "/placeholder.svg?height=40&width=40" },
          statusBadges: ["Job offer", "Consular appointment"],
        },
      ],
    },
    {
      employerId: 3,
      employerName: "Global Corp",
      jobs: [
        {
          id: 6,
          jobTitle: "Marketing Specialist",
          anticipatedStartDate: "2025-05-01",
          caseManager: { name: "Michael Chen", photo: "/placeholder.svg?height=40&width=40" },
          statusBadges: ["Recruiting", "Travel Logistics"],
        },
      ],
    },
  ])

  const handleTaskToggle = (taskId: number) => {
    setCriticalTasks((prev) =>
      prev
        .map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task))
        .sort((a, b) => {
          if (a.completed === b.completed) return 0
          return a.completed ? 1 : -1
        }),
    )
  }

  const isUrgent = (deadline: string) => {
    const deadlineDate = new Date(deadline)
    const today = new Date()
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 3
  }

  const [formData, setFormData] = useState({
    companyName: "",
    primaryContact: "",
    email: "",
    phone: "",
    invitationMessage:
      "Hi [$nombre de la compañía], I'd like to invite you to manage Peterson Yards' labor certification process and hiring with Zipmi.",
  })
  const [formErrors, setFormErrors] = useState({
    companyName: "",
    primaryContact: "",
    email: "",
    phone: "",
    invitationMessage: "",
  })

  const [certificationForm, setCertificationForm] = useState({
    employer: "",
    startDate: undefined as Date | undefined,
    numWorkers: "",
    workLocation: "",
    caseManager: "",
    visaType: "",
    modality: "",
  })

  const itemsPerPage = 10

  const mockCertifications = [
    {
      id: 1,
      title: "Software Engineer Position",
      company: "Peterson Yards Inc. - 2025",
      certId: "PET-2025-011",
      visaType: "H2B",
      created: "Created now",
      nextTask: "Complete ETA9141 form",
      caseManager: "Jimmy Butler",
      step: 1,
      status: "Draft",
    },
  ]

  const [certifications, setCertifications] = useState(mockCertifications)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const submitted = params.get("submitted")
    const certId = params.get("certId")

    if (submitted === "true" && certId) {
      setCertifications((prev) =>
        prev.map((cert) => {
          // Match by certId or by the ID in the URL
          if (
            cert.certId === certId ||
            certId.includes(cert.certId) ||
            cert.certId.includes(certId.replace("PET-", ""))
          ) {
            return { ...cert, status: "Awaiting approval" }
          }
          return cert
        }),
      )
      // Also update the first certification if no match (for demo purposes)
      setCertifications((prev) => {
        const hasAwaitingApproval = prev.some((cert) => cert.status === "Awaiting approval")
        if (!hasAwaitingApproval) {
          return prev.map((cert, index) => (index === 0 ? { ...cert, status: "Awaiting approval" } : cert))
        }
        return prev
      })
      // Clean up URL parameters
      window.history.replaceState({}, "", "/")
    }
  }, [])

  const step1Count = certifications.filter((cert) => cert.step === 1).length
  const step2Count = certifications.filter((cert) => cert.step === 2).length
  const step3Count = certifications.filter((cert) => cert.step === 3).length

  // Removed: const translations = { ... }
  // Removed: const t = translations[language]

  useEffect(() => {
    const section = searchParams.get("section")
    if (section && ["dashboard", "employers", "certifications"].includes(section)) {
      setActiveSection(section)
    }
  }, [searchParams])

  const validateField = (name: string, value: string) => {
    let error = ""

    if (!value.trim()) {
      error = t.required
    } else {
      switch (name) {
        case "companyName":
        case "primaryContact":
          if (value.length < 2) {
            error = t.minTwoChars
          }
          break
        case "email":
          if (!value.includes("@") || !value.includes(".")) {
            error = t.invalidEmail
          }
          break
        case "phone":
          if (value.length < 8 || value.length > 10) {
            error = t.phoneMinMax
          }
          break
        case "invitationMessage":
          if (value.length > 500) {
            error = t.maxChars
          }
          break
      }
    }

    return error
  }

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (name === "companyName") {
      const companyPlaceholder = value.trim() ? `[${value.trim()}]` : "[$nombre de la compañía]"
      const defaultMessage =
        language === "es"
          ? `Hola ${companyPlaceholder}, me gustaría invitarte a gestionar el proceso de certificación laboral y contratación de Peterson Yards con Zipmi.`
          : `Hi ${companyPlaceholder}, I'd like to invite you to manage Peterson Yards' labor certification process and hiring with Zipmi.`

      setFormData((prev) => ({
        ...prev,
        invitationMessage: defaultMessage,
      }))
    }

    const error = validateField(name, value)
    setFormErrors((prev) => ({
      ...prev,
      [name]: error,
    }))
  }

  const handleSubmit = () => {
    // Validate all fields
    const errors = {
      companyName: validateField("companyName", formData.companyName),
      primaryContact: validateField("primaryContact", formData.primaryContact),
      email: validateField("email", formData.email),
      phone: validateField("phone", formData.phone),
      invitationMessage: validateField("invitationMessage", formData.invitationMessage),
    }

    setFormErrors(errors)

    // Check if there are any errors
    const hasErrors = Object.values(errors).some((error) => error !== "")

    if (!hasErrors) {
      // Submit form
      console.log("Form submitted:", formData)
      setIsModalOpen(false)
      // Reset form
      setFormData({
        companyName: "",
        primaryContact: "",
        email: "",
        phone: "",
        invitationMessage:
          "Hi [$nombre de la compañía], I'd like to invite you to manage Peterson Yards' labor certification process and hiring with Zipmi.",
      })
      setFormErrors({
        companyName: "",
        primaryContact: "",
        email: "",
        phone: "",
        invitationMessage: "",
      })
    }
  }

  const getSectionTitle = () => {
    switch (activeSection) {
      case "dashboard":
        return t.dashboard
      case "employers":
        return t.employers
      case "certifications":
        return t.certifications
      case "agentStaff":
        return t.staffAgent
      case "calendar":
        return t.calendar
      case "messages":
        return t.messages
      default:
        return t.dashboard
    }
  }

  // Mock data for employers
  const employersData = [
    {
      id: 1,
      companyName: "Tech Corp",
      primaryContact: "John Doe",
      location: "New York, NY",
      email: "john@techcorp.com",
      status: "Approved", // Changed status to use new badge variants
      phone: "+1234567890",
      caseManager: "Sarah Smith",
    },
    {
      id: 2,
      companyName: "Global Industries",
      primaryContact: "Jane Smith",
      location: "Los Angeles, CA",
      email: "jane@global.com",
      status: "Invitation Sent", // Changed status to use new badge variants
      phone: "+1987654321",
      caseManager: "Mike Johnson",
    },
    {
      id: 3,
      companyName: "Innovation Labs",
      primaryContact: "Bob Wilson",
      location: "San Francisco, CA",
      email: "bob@innovation.com",
      status: "Declined", // Changed status to use new badge variants
      phone: "+1122334455",
      caseManager: "Emily Davis",
    },
    {
      id: 4,
      companyName: "Future Systems",
      primaryContact: "Alice Brown",
      location: "Chicago, IL",
      email: "alice@future.com",
      status: "Approved", // Changed status to use new badge variants
      phone: "+1555666777",
      caseManager: "David Lee",
    },
    {
      id: 5,
      companyName: "Smart Solutions",
      primaryContact: "Charlie Green",
      location: "Austin, TX",
      email: "charlie@smart.com",
      status: "Invitation Sent", // Changed status to use new badge variants
      phone: "+1888999000",
      caseManager: "Lisa White",
    },
    {
      id: 6,
      companyName: "Digital Dynamics",
      primaryContact: "Diana Prince",
      location: "Seattle, WA",
      email: "diana@digital.com",
      status: "Approved", // Changed status to use new badge variants
      phone: "+1222333444",
      caseManager: "Tom Harris",
    },
    {
      id: 7,
      companyName: "Cloud Computing Co",
      primaryContact: "Edward Norton",
      location: "Boston, MA",
      email: "edward@cloud.com",
      status: "Declined", // Changed status to use new badge variants
      phone: "+1666777888",
      caseManager: "Anna Martin",
    },
    {
      id: 8,
      companyName: "Data Analytics Inc",
      primaryContact: "Fiona Apple",
      location: "Denver, CO",
      email: "fiona@data.com",
      status: "Approved", // Changed status to use new badge variants
      phone: "+1444555666",
      caseManager: "Chris Brown",
    },
    {
      id: 9,
      companyName: "Security First",
      primaryContact: "George Miller",
      location: "Miami, FL",
      email: "george@security.com",
      status: "Invitation Sent", // Changed status to use new badge variants
      phone: "+1777888999",
      caseManager: "Jessica Taylor",
    },
    {
      id: 10,
      companyName: "Mobile Apps Ltd",
      primaryContact: "Helen Mirren",
      location: "Portland, OR",
      email: "helen@mobile.com",
      status: "Declined", // Changed status to use new badge variants
      phone: "+1333444555",
      caseManager: "Robert King",
    },
    {
      id: 11,
      companyName: "Web Design Studio",
      primaryContact: "Ian McKellen",
      location: "Nashville, TN",
      email: "ian@webdesign.com",
      status: "Approved", // Changed status to use new badge variants
      phone: "+1999000111",
      caseManager: "Michelle Obama",
    },
  ]

  const filteredEmployers = employersData.filter(
    (employer) =>
      employer.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employer.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalPages = Math.ceil(filteredEmployers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentEmployers = filteredEmployers.slice(startIndex, endIndex)

  const getStatusBadgeVariant = (status: string): "success" | "error" | "info" => {
    if (status === "Approved") return "success"
    if (status === "Declined") return "error"
    return "info" // Invitation Sent
  }

  const getStatusText = (status: string) => {
    if (language === "es") {
      if (status === "Approved") return "Aprobado"
      if (status === "Declined") return "Declinado"
      return "Invitación enviada"
    }
    return status
  }

  const handleCreateCertification = () => {
    const newId = `PET-2025-${String(Math.floor(Math.random() * 10000)).padStart(6, "0")}`
    router.push(`/certifications/${newId}`)
    setShowAddCertificationPanel(false)
  }

  // Added state for employer search term
  const [employerSearchTerm, setEmployerSearchTerm] = useState("")

  return (
    <div className="flex min-h-screen bg-background">
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      <aside
        className={`fixed lg:sticky top-0 z-50 h-screen w-64 flex-shrink-0 overflow-y-auto border-r border-border bg-white px-4 py-6 transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="absolute right-4 top-6 lg:hidden text-foreground"
          aria-label="Close sidebar"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-8">
          <img src="/images/logo.png" alt="Zipmi" className="w-96 h-11" />
        </div>

        <div className="space-y-2">
          <div>
            <nav className="space-y-1">
              <button
                onClick={() => {
                  setActiveSection("dashboard")
                  setIsSidebarOpen(false)
                }}
                className={`flex w-full items-center gap-3 rounded-md py-2 text-sm hover:bg-[#E7F6FF] px-2 ${
                  activeSection === "dashboard" ? "bg-[#E7F6FF] text-[#0045FF]" : "text-foreground"
                }`}
              >
                <LayoutDashboardIcon className={`h-4 w-4 ${activeSection === "dashboard" ? "text-[#0045FF]" : ""}`} />
                {t.dashboard}
              </button>
              <button
                onClick={() => {
                  setActiveSection("employers")
                  setIsSidebarOpen(false)
                }}
                className={`flex w-full items-center gap-3 rounded-md py-2 text-sm hover:bg-[#E7F6FF] px-2 ${
                  activeSection === "employers" ? "bg-[#E7F6FF] text-[#0045FF]" : "text-foreground"
                }`}
              >
                <UsersIcon className={`h-4 w-4 ${activeSection === "employers" ? "text-[#0045FF]" : ""}`} />
                {t.employers}
              </button>
              <button
                onClick={() => {
                  setActiveSection("certifications")
                  setIsSidebarOpen(false)
                }}
                className={`flex w-full items-center gap-3 rounded-md py-2 text-sm hover:bg-[#E7F6FF] px-2 ${
                  activeSection === "certifications" ? "bg-[#E7F6FF] text-[#0045FF]" : "text-foreground"
                }`}
              >
                <BadgeCheckIcon className={`h-4 w-4 ${activeSection === "certifications" ? "text-[#0045FF]" : ""}`} />
                {t.certifications}
              </button>
            </nav>
          </div>

          <div>
            <nav className="space-y-1">
              <button
                onClick={() => {
                  setActiveSection("agentStaff")
                  setIsSidebarOpen(false)
                }}
                className={`flex w-full items-center gap-3 rounded-md py-2 text-sm hover:bg-[#E7F6FF] px-2 ${
                  activeSection === "agentStaff" ? "bg-[#E7F6FF] text-[#0045FF]" : "text-foreground"
                }`}
              >
                <UserIcon className={`h-4 w-4 ${activeSection === "agentStaff" ? "text-[#0045FF]" : ""}`} />
                {t.staffAgent}
              </button>
              <button
                onClick={() => {
                  setActiveSection("calendar")
                  setIsSidebarOpen(false)
                }}
                className={`flex w-full items-center gap-3 rounded-md py-2 text-sm hover:bg-[#E7F6FF] px-2 ${
                  activeSection === "calendar" ? "bg-[#E7F6FF] text-[#0045FF]" : "text-foreground"
                }`}
              >
                <CalendarIcon className={`h-4 w-4 ${activeSection === "calendar" ? "text-[#0045FF]" : ""}`} />
                {t.calendar}
              </button>
            </nav>
          </div>

          <div>
            <nav className="space-y-1">
              <button
                onClick={() => {
                  setActiveSection("messages")
                  setIsSidebarOpen(false)
                }}
                className={`flex w-full items-center gap-3 rounded-md py-2 text-sm hover:bg-[#E7F6FF] px-2 ${
                  activeSection === "messages" ? "bg-[#E7F6FF] text-[#0045FF]" : "text-foreground"
                }`}
              >
                <MessageCircleIcon className={`h-4 w-4 ${activeSection === "messages" ? "text-[#0045FF]" : ""}`} />
                {t.messages}
              </button>
            </nav>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Page Header */}
        <header className="sticky top-0 z-10 bg-[rgba(245,245,245,1)] border-b border-transparent">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden text-foreground"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-xl lg:text-2xl font-semibold text-foreground">{getSectionTitle()}</h1>
            </div>
            <div className="flex items-center gap-2 lg:gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="icon">
                    <Globe className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setLanguage("en")}>English</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage("es")}>Español</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="secondary" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6">
          {/* Removed conditional rendering for certification detail */}
          {activeSection === "employers" && (
            <div className="mb-6">
              <Card>
                <CardHeader>
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                      <CardTitle>
                        {mockCertifications.length} {t.companies}
                      </CardTitle>
                      <CardDescription>{t.manageEmployers}</CardDescription>
                    </div>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <div className="relative w-full sm:w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                        <Input
                          placeholder={t.searchEmployers}
                          value={searchTerm}
                          onChange={(e) => {
                            setSearchTerm(e.target.value)
                            setCurrentPage(1)
                          }}
                          className="pl-8 w-full"
                        />
                      </div>
                      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                        <DialogTrigger asChild>
                          <Button className="gap-2 whitespace-nowrap">
                            <Plus className="h-4 w-4" />
                            {t.addEmployer}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="min-w-[90vw] sm:min-w-[720px] max-w-[720px] min-h-[538px] max-h-[90vh] overflow-y-auto bg-background-sidebar">
                          <DialogHeader>
                            <DialogTitle>{t.addEmployerTitle}</DialogTitle>
                            <DialogDescription>{t.addEmployerDescription}</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] items-start gap-4">
                              <Label htmlFor="companyName" className="pt-2">
                                {t.companyName}
                              </Label>
                              <div className="space-y-1">
                                <Input
                                  id="companyName"
                                  placeholder={t.companyNamePlaceholder}
                                  value={formData.companyName}
                                  onChange={(e) => handleInputChange("companyName", e.target.value)}
                                  aria-invalid={!!formErrors.companyName}
                                />
                                {formErrors.companyName && (
                                  <p className="text-xs text-destructive">{formErrors.companyName}</p>
                                )}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] items-start gap-4">
                              <Label htmlFor="primaryContact" className="pt-2">
                                {t.primaryContact}
                              </Label>
                              <div className="space-y-1">
                                <Input
                                  id="primaryContact"
                                  placeholder={t.primaryContactPlaceholder}
                                  value={formData.primaryContact}
                                  onChange={(e) => handleInputChange("primaryContact", e.target.value)}
                                  aria-invalid={!!formErrors.primaryContact}
                                />
                                {formErrors.primaryContact && (
                                  <p className="text-xs text-destructive">{formErrors.primaryContact}</p>
                                )}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] items-start gap-4">
                              <Label htmlFor="email" className="pt-2">
                                {t.emailAddress}
                              </Label>
                              <div className="space-y-1">
                                <Input
                                  id="email"
                                  type="email"
                                  placeholder={t.emailPlaceholder}
                                  value={formData.email}
                                  onChange={(e) => handleInputChange("email", e.target.value)}
                                  aria-invalid={!!formErrors.email}
                                />
                                {formErrors.email && <p className="text-xs text-destructive">{formErrors.email}</p>}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] items-start gap-4">
                              <Label htmlFor="phone" className="pt-2">
                                {t.phone}
                              </Label>
                              <div className="space-y-1">
                                <Input
                                  id="phone"
                                  type="tel"
                                  placeholder={t.phonePlaceholder}
                                  value={formData.phone}
                                  onChange={(e) => handleInputChange("phone", e.target.value)}
                                  aria-invalid={!!formErrors.phone}
                                />
                                {formErrors.phone && <p className="text-xs text-destructive">{formErrors.phone}</p>}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] items-start gap-4">
                              <Label htmlFor="invitationMessage" className="pt-2">
                                {t.invitationMessage}
                              </Label>
                              <div className="space-y-1">
                                <Textarea
                                  id="invitationMessage"
                                  rows={4}
                                  maxLength={500}
                                  value={formData.invitationMessage}
                                  onChange={(e) => handleInputChange("invitationMessage", e.target.value)}
                                  aria-invalid={!!formErrors.invitationMessage}
                                />
                                {formErrors.invitationMessage && (
                                  <p className="text-xs text-destructive">{formErrors.invitationMessage}</p>
                                )}
                                <p className="text-xs text-muted-foreground">
                                  {formData.invitationMessage.length}/500{" "}
                                  {language === "es" ? "caracteres" : "characters"}
                                </p>
                              </div>
                            </div>
                          </div>
                          <DialogFooter className="flex-col sm:flex-row gap-2">
                            <Button
                              variant="secondary"
                              onClick={() => setIsModalOpen(false)}
                              className="w-full sm:w-auto"
                            >
                              {t.cancel}
                            </Button>
                            <Button onClick={handleSubmit} className="w-full sm:w-auto">
                              {t.sendInvitation}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="whitespace-nowrap">{t.id}</TableHead>
                          <TableHead className="whitespace-nowrap">{t.companyName}</TableHead>
                          <TableHead className="whitespace-nowrap">{t.primaryContact}</TableHead>
                          <TableHead className="whitespace-nowrap">{t.location}</TableHead>
                          <TableHead className="whitespace-nowrap">{t.email}</TableHead>
                          <TableHead className="whitespace-nowrap">{t.status}</TableHead>
                          <TableHead className="whitespace-nowrap">{t.phone}</TableHead>
                          <TableHead className="whitespace-nowrap">{t.caseManager}</TableHead>
                          <TableHead className="whitespace-nowrap">{t.actions}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentEmployers.map((employer) => (
                          <TableRow key={employer.id} className="hover:bg-[#E7F6FF]">
                            <TableCell className="whitespace-nowrap">{employer.id}</TableCell>
                            <TableCell className="whitespace-nowrap">
                              <a href="#" className="text-blue-600 hover:underline">
                                {employer.companyName}
                              </a>
                            </TableCell>
                            <TableCell className="whitespace-nowrap">{employer.primaryContact}</TableCell>
                            <TableCell className="whitespace-nowrap">{employer.location}</TableCell>
                            <TableCell className="whitespace-nowrap">{employer.email}</TableCell>
                            <TableCell className="whitespace-nowrap">
                              <Badge variant={getStatusBadgeVariant(employer.status)}>
                                {getStatusText(employer.status)}
                              </Badge>
                            </TableCell>
                            <TableCell className="whitespace-nowrap">{employer.phone}</TableCell>
                            <TableCell className="whitespace-nowrap">{employer.caseManager}</TableCell>
                            <TableCell className="whitespace-nowrap">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Eye className="mr-2 h-4 w-4" />
                                    {t.viewDetails}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" />
                                    {t.edit}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-destructive">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    {t.delete}
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
                    <div className="text-sm text-muted-foreground text-center sm:text-left">
                      {t.showing} {startIndex + 1} {t.to} {Math.min(endIndex, filteredEmployers.length)} {t.of}{" "}
                      {filteredEmployers.length} {t.records}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                      >
                        {t.previous}
                      </Button>
                      <span className="text-sm whitespace-nowrap">
                        {currentPage} / {totalPages}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                      >
                        {t.next}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "dashboard" && (
            <div className="space-y-6">
              {/* Panel de Priorización - Priority Panel with Stat Cards */}

              {/* Controles de Interfaz - Segmented Control for view switching */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <CardTitle className="text-blue-600">
                        {language === "en" ? "Process Matrix" : "Matriz de Procesos"}
                      </CardTitle>
                      <CardDescription>
                        {language === "en"
                          ? "Linear progress view of all active employers"
                          : "Vista de progreso lineal de todos los empleadores activos"}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-4">
                      {/* Filtro Solo Importantes */}
                      <label className="flex items-center gap-2 text-sm cursor-pointer">
                        <input type="checkbox" className="rounded border-border" />
                        <span className="text-secondary-font">
                          {language === "en" ? "Critical Only" : "Solo Importantes"}
                        </span>
                      </label>
                      {/* Segmented Control for Role Selection */}
                      <Tabs defaultValue="h2-filings" className="w-auto">
                        <TabsList className="grid grid-cols-2">
                          <TabsTrigger value="h2-filings" className="text-xs sm:text-sm">
                            {language === "en" ? "H2 Filings" : "Presentaciones H2"}
                          </TabsTrigger>
                          <TabsTrigger value="foreign" className="text-xs sm:text-sm">
                            {language === "en" ? "Foreign Processing" : "Proc. Extranjero"}
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Linear Progress Matrix - Each row is an employer */}
                  <div className="overflow-x-auto -mx-4 sm:mx-0">
                    <div className="min-w-[800px] px-4 sm:px-0">
                      {/* Header Row */}
                      <div className="grid grid-cols-12 gap-2 pb-2 border-b border-border mb-4 text-xs font-medium text-tertiary-font">
                        <div className="col-span-3">
                          {language === "en" ? "Employer / Start Date" : "Empleador / Fecha Inicio"}
                        </div>
                        <div className="col-span-2 text-center">9141</div>
                        <div className="col-span-2 text-center">9142</div>
                        <div className="col-span-2 text-center">I-129</div>
                        <div className="col-span-2 text-center">{language === "en" ? "Workers" : "Trabajadores"}</div>
                        <div className="col-span-1 text-center">{language === "en" ? "Travel" : "Viaje"}</div>
                      </div>

                      {/* Employer Rows with Linear Step Progressors */}
                      {[
                        {
                          employer: "Peterson Yards Inc.",
                          startDate: "March 15, 2026",
                          step9141: "completed",
                          step9142: "in-progress",
                          stepI129: "not-started",
                          workersProgress: 85,
                          travelReady: false,
                          priority: "critical",
                        },
                        {
                          employer: "Green Valley Farms LLC",
                          startDate: "April 1, 2026",
                          step9141: "in-progress",
                          step9142: "not-started",
                          stepI129: "not-started",
                          workersProgress: 45,
                          travelReady: false,
                          priority: "warning",
                        },
                        {
                          employer: "Harvest Solutions Co.",
                          startDate: "March 28, 2026",
                          step9141: "completed",
                          step9142: "completed",
                          stepI129: "in-progress",
                          workersProgress: 92,
                          travelReady: false,
                          priority: "normal",
                        },
                        {
                          employer: "AgriTech Partners",
                          startDate: "April 10, 2026",
                          step9141: "completed",
                          step9142: "completed",
                          stepI129: "completed",
                          workersProgress: 100,
                          travelReady: true,
                          priority: "success",
                        },
                        {
                          employer: "Sunbelt Growers Inc.",
                          startDate: "May 5, 2026",
                          step9141: "not-started",
                          step9142: "not-started",
                          stepI129: "not-started",
                          workersProgress: 0,
                          travelReady: false,
                          priority: "normal",
                        },
                      ].map((row, idx) => (
                        <div
                          key={idx}
                          className={`grid grid-cols-12 gap-2 p-3 rounded-lg mb-2 items-center ${
                            row.priority === "critical"
                              ? "bg-red-50 border border-red-200"
                              : row.priority === "warning"
                                ? "bg-orange-50 border border-orange-200"
                                : row.priority === "success"
                                  ? "bg-green-50 border border-green-200"
                                  : "bg-background-sidebar border border-border hover:bg-hover-table"
                          } cursor-pointer transition-colors`}
                        >
                          {/* Employer Identity */}
                          <div className="col-span-3">
                            <div className="font-semibold text-primary-font">{row.employer}</div>
                            <div className="text-xs text-tertiary-font flex items-center gap-1 mt-1">
                              <CalendarIcon className="h-3 w-3" />
                              {row.startDate}
                            </div>
                          </div>

                          {/* 9141 Step Progressor */}
                          <div className="col-span-2 flex justify-center">
                            <div className="flex items-center gap-1">
                              <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                                  row.step9141 === "completed"
                                    ? "bg-green-500 border-green-500 text-white"
                                    : row.step9141 === "in-progress"
                                      ? "bg-orange-500 border-orange-500 text-white"
                                      : "bg-gray-200 border-gray-300 text-gray-500"
                                }`}
                              >
                                {row.step9141 === "completed" ? "✓" : row.step9141 === "in-progress" ? "○" : ""}
                              </div>
                            </div>
                          </div>

                          {/* 9142 Step Progressor */}
                          <div className="col-span-2 flex justify-center">
                            <div className="flex items-center gap-1">
                              <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                                  row.step9142 === "completed"
                                    ? "bg-green-500 border-green-500 text-white"
                                    : row.step9142 === "in-progress"
                                      ? "bg-orange-500 border-orange-500 text-white"
                                      : "bg-gray-200 border-gray-300 text-gray-500"
                                }`}
                              >
                                {row.step9142 === "completed" ? "✓" : row.step9142 === "in-progress" ? "○" : ""}
                              </div>
                            </div>
                          </div>

                          {/* I-129 Step Progressor */}
                          <div className="col-span-2 flex justify-center">
                            <div className="flex items-center gap-1">
                              <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                                  row.stepI129 === "completed"
                                    ? "bg-green-500 border-green-500 text-white"
                                    : row.stepI129 === "in-progress"
                                      ? "bg-orange-500 border-orange-500 text-white"
                                      : "bg-gray-200 border-gray-300 text-gray-500"
                                }`}
                              >
                                {row.stepI129 === "completed" ? "✓" : row.stepI129 === "in-progress" ? "○" : ""}
                              </div>
                            </div>
                          </div>

                          {/* Stacked Progress Bar for Workers */}
                          <div className="col-span-2">
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span className="text-tertiary-font">
                                  {language === "en" ? "Progress" : "Progreso"}
                                </span>
                                <span className="font-semibold text-primary-font">{row.workersProgress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full transition-all ${
                                    row.workersProgress === 100
                                      ? "bg-green-500"
                                      : row.workersProgress >= 50
                                        ? "bg-blue-500"
                                        : "bg-orange-500"
                                  }`}
                                  style={{ width: `${row.workersProgress}%` }}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Travel Logistics Icon */}
                          <div className="col-span-1 flex justify-center">
                            <Plane className={`h-5 w-5 ${row.travelReady ? "text-green-600" : "text-gray-300"}`} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    {language === "en" ? "Critical Tasks" : "Tareas Críticas"}
                  </CardTitle>
                  <CardDescription>
                    {language === "en"
                      ? "Tasks that require immediate attention based on deadlines"
                      : "Tareas que requieren atención inmediata según los plazos"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {criticalTasks.map((task) => (
                    <div
                      key={task.id}
                      className={`flex items-start gap-3 p-4 border border-border rounded-lg transition-all ${
                        task.completed ? "bg-muted opacity-60" : "bg-white"
                      }`}
                    >
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => handleTaskToggle(task.id)}
                        className="mt-1"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p
                            className={`font-medium ${
                              task.completed ? "line-through text-muted-foreground" : "text-foreground"
                            }`}
                          >
                            {task.name}
                          </p>
                          {isUrgent(task.deadline) && !task.completed && (
                            <Badge variant="destructive" className="text-xs">
                              {language === "en" ? "Urgent" : "Urgente"}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <CalendarIcon className="h-3.5 w-3.5" />
                            {new Date(task.deadline).toLocaleDateString(language === "en" ? "en-US" : "es-ES", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                          <span>•</span>
                          <span>{task.company}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    {language === "en" ? "Process Status Board" : "Tablero de Estados del Proceso"}
                  </CardTitle>
                  <CardDescription>
                    {language === "en"
                      ? "Track employer applications across different stages"
                      : "Seguimiento de aplicaciones de empleadores en diferentes etapas"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Prevailing Wage Column */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-semibold text-sm text-foreground truncate min-w-0">
                          {language === "en" ? "Prevailing Wage" : "Salario Prevalente"}
                        </h3>
                        <Badge variant="secondary" className="text-xs shrink-0">
                          {kanbanData.prevailingWage.length}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        {kanbanData.prevailingWage.map((item) => (
                          <Card key={item.id} className="border border-border bg-white">
                            <CardContent className="p-4 space-y-2">
                              <p className="font-medium text-sm text-foreground">{item.employer}</p>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <CalendarIcon className="h-3 w-3" />
                                <span>
                                  {new Date(item.deadline).toLocaleDateString(language === "en" ? "en-US" : "es-ES", {
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </span>
                              </div>
                              <Button variant="outline" size="sm" className="w-full text-xs bg-transparent">
                                {language === "en" ? "View details" : "Ver detalles"}
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* Labor Certification Column */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-semibold text-sm text-foreground truncate min-w-0">
                          {language === "en" ? "Labor Certification" : "Certificación Laboral"}
                        </h3>
                        <Badge variant="secondary" className="text-xs shrink-0">
                          {kanbanData.laborCertification.length}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        {kanbanData.laborCertification.map((item) => (
                          <Card key={item.id} className="border border-border bg-white">
                            <CardContent className="p-4 space-y-2">
                              <p className="font-medium text-sm text-foreground">{item.employer}</p>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <CalendarIcon className="h-3 w-3" />
                                <span>
                                  {new Date(item.deadline).toLocaleDateString(language === "en" ? "en-US" : "es-ES", {
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </span>
                              </div>
                              <Button variant="outline" size="sm" className="w-full text-xs bg-transparent">
                                {language === "en" ? "View details" : "Ver detalles"}
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* I-129 Petition Column */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-semibold text-sm text-foreground truncate min-w-0">
                          {language === "en" ? "I-129 Petition" : "Petición I-129"}
                        </h3>
                        <Badge variant="secondary" className="text-xs shrink-0">
                          {kanbanData.i129Petition.length}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        {kanbanData.i129Petition.map((item) => (
                          <Card key={item.id} className="border border-border bg-white">
                            <CardContent className="p-4 space-y-2">
                              <p className="font-medium text-sm text-foreground">{item.employer}</p>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <CalendarIcon className="h-3 w-3" />
                                <span>
                                  {new Date(item.deadline).toLocaleDateString(language === "en" ? "en-US" : "es-ES", {
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </span>
                              </div>
                              <Button variant="outline" size="sm" className="w-full text-xs bg-transparent">
                                {language === "en" ? "View details" : "Ver detalles"}
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Foreign Process Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    {language === "en" ? t.foreignProcess : t.foreignProcess}
                  </CardTitle>
                  <CardDescription>
                    {language === "en" ? t.trackForeignWorkerJobs : t.trackForeignWorkerJobs}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Foreign Process Search */}
                  <div className="mb-4">
                    <div className="relative w-full max-w-md">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                      <Input
                        placeholder={language === "en" ? "Search employers..." : "Buscar empleadores..."}
                        value={employerSearchTerm}
                        onChange={(e) => setEmployerSearchTerm(e.target.value)}
                        className="pl-8 w-full"
                      />
                    </div>
                  </div>

                  <Accordion type="multiple" className="space-y-4">
                    {foreignProcessData.map((employer) => (
                      <AccordionItem
                        key={employer.employerId}
                        value={`employer-${employer.employerId}`}
                        className="border border-border rounded-lg bg-white px-4"
                      >
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-center justify-between w-full pr-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage
                                  src={`/.jpg?key=kw26k&height=32&width=32&query=${employer.employerName}`}
                                />
                                <AvatarFallback>{employer.employerName.slice(0, 2).toUpperCase()}</AvatarFallback>
                              </Avatar>
                              <h3 className="font-semibold text-base text-foreground">{employer.employerName}</h3>
                            </div>
                            <Button
                              variant="link"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                window.location.href = `/certifications/${employer.employerId}`
                              }}
                              className="ml-auto mr-2"
                            >
                              Go to dashboard
                            </Button>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          {/* Job Cards Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                            {employer.jobs.slice(0, 3).map((job) => (
                              <Card key={job.id} className="border border-border bg-white">
                                <CardContent className="p-4">
                                  <div className="space-y-3">
                                    {/* Job Title */}
                                    <h4 className="font-semibold text-sm text-foreground line-clamp-2 break-words">
                                      {job.jobTitle}
                                    </h4>

                                    {/* Anticipated Start Date */}
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                      <CalendarIcon className="h-3 w-3" />
                                      <span>
                                        {language === "en" ? t.startDate : t.startDate}
                                        {new Date(job.anticipatedStartDate).toLocaleDateString(
                                          language === "en" ? "en-US" : "es-ES",
                                          {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                          },
                                        )}
                                      </span>
                                    </div>

                                    {/* Status Badges */}
                                    <div className="flex flex-wrap gap-1.5">
                                      {job.statusBadges.map((badge, idx) => (
                                        <Badge
                                          key={idx}
                                          variant="secondary"
                                          className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 border-blue-200 whitespace-nowrap"
                                        >
                                          {badge}
                                        </Badge>
                                      ))}
                                    </div>

                                    {/* Case Manager with Photo */}
                                    <div className="flex items-center justify-between pt-2 border-t border-border">
                                      <div className="min-w-0 flex-1 mr-2">
                                        <p className="text-xs text-muted-foreground">
                                          {language === "en" ? t.caseManager : t.caseManager}
                                        </p>
                                        <p className="text-sm font-medium text-foreground truncate">
                                          {job.caseManager.name}
                                        </p>
                                      </div>
                                      <Avatar className="h-8 w-8 shrink-0">
                                        <AvatarImage
                                          src={job.caseManager.photo || "/placeholder.svg"}
                                          alt={job.caseManager.name}
                                        />
                                        <AvatarFallback>
                                          {job.caseManager.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                        </AvatarFallback>
                                      </Avatar>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>

                          {/* Show more link if there are more than 3 jobs */}
                          {employer.jobs.length > 3 && (
                            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 mt-4">
                              {language === "en"
                                ? t.viewMoreJobs(employer.jobs.length - 3)
                                : t.viewMoreJobs(employer.jobs.length - 3)}
                            </Button>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Old Dashboard View - Kept for reference or potential future use */}
          {!["employers", "certifications"].includes(activeSection) && activeSection !== "dashboard" && (
            <div className="space-y-6">
              {/* Panel de Priorización Diaria - Daily Priority Panel */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {/* Acción Inmediata - Immediate Action */}
                <Card className="border-l-4 border-l-red-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-red-600">
                      {language === "en" ? "Immediate Action" : "Acción Inmediata"}
                    </CardTitle>
                    <AlertCircle className="h-5 w-5 text-red-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-red-600">3</div>
                    <p className="text-xs text-secondary-font mt-1">
                      {language === "en" ? "Legal deadlines < 24 hours" : "Plazos legales < 24 horas"}
                    </p>
                  </CardContent>
                </Card>

                {/* Tareas Atrasadas - Overdue Tasks */}
                <Card className="border-l-4 border-l-orange-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-orange-600">
                      {language === "en" ? "Overdue Tasks" : "Tareas Atrasadas"}
                    </CardTitle>
                    <Clock className="h-5 w-5 text-orange-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-orange-600">7</div>
                    <p className="text-xs text-secondary-font mt-1">
                      {language === "en" ? "Incomplete system milestones" : "Hitos del sistema no completados"}
                    </p>
                  </CardContent>
                </Card>

                {/* Ventanas de Presentación Abiertas - Open Filing Windows */}
                <Card className="border-l-4 border-l-blue-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-blue-600">
                      {language === "en" ? "Open Filing Windows" : "Ventanas de Presentación Abiertas"}
                    </CardTitle>
                    <CalendarIcon className="h-5 w-5 text-blue-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600">12</div>
                    <p className="text-xs text-secondary-font mt-1">
                      {language === "en" ? "Employers in 90-75 day range" : "Empleadores en rango 90-75 días"}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Widget de Agenda Inteligente - Smart Agenda */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-600">
                    {language === "en" ? "Top 5 Priorities Today" : "Top 5 Prioridades del Día"}
                  </CardTitle>
                  <CardDescription>
                    {language === "en"
                      ? "Auto-generated based on system timestamps"
                      : "Generadas automáticamente por timestamps del sistema"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      {
                        employer: "Peterson Yards Inc.",
                        task:
                          language === "en" ? "Complete Form 9142 filing" : "Completar presentación Formulario 9142",
                        deadline: "12:00 PM today",
                        priority: "critical",
                      },
                      {
                        employer: "Green Valley Farms LLC",
                        task:
                          language === "en"
                            ? "Submit prevailing wage determination"
                            : "Enviar determinación salario prevaleciente",
                        deadline: "4:00 PM today",
                        priority: "critical",
                      },
                      {
                        employer: "Harvest Solutions Co.",
                        task:
                          language === "en"
                            ? "Upload missing documents for I-129"
                            : "Cargar documentos faltantes para I-129",
                        deadline: "Tomorrow 10:00 AM",
                        priority: "high",
                      },
                      {
                        employer: "AgriTech Partners",
                        task:
                          language === "en"
                            ? "Review and approve ETA-9141 draft"
                            : "Revisar y aprobar borrador ETA-9141",
                        deadline: "Tomorrow 2:00 PM",
                        priority: "medium",
                      },
                      {
                        employer: "Sunbelt Growers Inc.",
                        task: language === "en" ? "Schedule consular appointments" : "Programar citas consulares",
                        deadline: "In 2 days",
                        priority: "medium",
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className={`flex items-start justify-between p-3 rounded-lg border ${
                          item.priority === "critical"
                            ? "bg-red-50 border-red-200"
                            : item.priority === "high"
                              ? "bg-orange-50 border-orange-200"
                              : "bg-blue-50 border-blue-200"
                        }`}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-primary-font">{item.employer}</span>
                            <Badge
                              variant={
                                item.priority === "critical" ? "error" : item.priority === "high" ? "default" : "info"
                              }
                              className="text-xs"
                            >
                              {item.priority === "critical" ? "🔴" : item.priority === "high" ? "🟠" : "🔵"}
                            </Badge>
                          </div>
                          <p className="text-sm text-secondary-font mt-1">{item.task}</p>
                        </div>
                        <div className="text-xs text-tertiary-font whitespace-nowrap ml-4">
                          <Clock className="h-3 w-3 inline mr-1" />
                          {item.deadline}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Vista de Calendario - Calendar View */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-blue-600">{language === "en" ? "Schedule" : "Agenda"}</CardTitle>
                      <CardDescription>
                        {language === "en" ? "Upcoming appointments and meetings" : "Próximas citas y reuniones"}
                      </CardDescription>
                    </div>
                    <Tabs defaultValue="week" className="w-auto">
                      <TabsList>
                        <TabsTrigger value="day">{language === "en" ? "Day" : "Día"}</TabsTrigger>
                        <TabsTrigger value="week">{language === "en" ? "Week" : "Semana"}</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Week View - Default */}
                  <div className="space-y-4">
                    {/* Week Days Header */}
                    <div className="grid grid-cols-7 gap-2 text-center text-xs font-medium text-tertiary-font border-b pb-2">
                      {[
                        { en: "Mon", es: "Lun", date: "16" },
                        { en: "Tue", es: "Mar", date: "17" },
                        { en: "Wed", es: "Mié", date: "18" },
                        { en: "Thu", es: "Jue", date: "19" },
                        { en: "Fri", es: "Vie", date: "20" },
                        { en: "Sat", es: "Sáb", date: "21" },
                        { en: "Sun", es: "Dom", date: "22" },
                      ].map((day, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="text-tertiary-font">{language === "en" ? day.en : day.es}</div>
                          <div
                            className={`text-lg font-semibold ${
                              idx === 2
                                ? "text-white bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center mx-auto"
                                : "text-primary-font"
                            }`}
                          >
                            {day.date}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Calendar Grid with Time Slots */}
                    <div className="relative">
                      {/* Time Labels */}
                      <div className="absolute left-0 top-0 bottom-0 w-16 space-y-12 text-xs text-tertiary-font pt-2">
                        {["8 AM", "10 AM", "12 PM", "2 PM", "4 PM", "6 PM"].map((time, idx) => (
                          <div key={idx} className="h-0 -mt-2">
                            {time}
                          </div>
                        ))}
                      </div>

                      {/* Calendar Content */}
                      <div className="ml-16 grid grid-cols-7 gap-2 border-l">
                        {/* Monday */}
                        <div className="border-r min-h-[400px] relative">
                          <div className="absolute top-8 left-1 right-1 bg-blue-100 border-l-4 border-blue-600 rounded p-2 text-xs">
                            <div className="font-semibold text-blue-900">9:00 AM</div>
                            <div className="text-blue-800">Peterson Yards</div>
                            <div className="text-blue-700">
                              {language === "en" ? "Case Review" : "Revisión de caso"}
                            </div>
                          </div>
                        </div>

                        {/* Tuesday */}
                        <div className="border-r min-h-[400px] relative">
                          <div className="absolute top-24 left-1 right-1 bg-green-100 border-l-4 border-green-600 rounded p-2 text-xs">
                            <div className="font-semibold text-green-900">11:00 AM</div>
                            <div className="text-green-800">Green Valley Farms</div>
                            <div className="text-green-700">
                              {language === "en" ? "Document Review" : "Revisión documentos"}
                            </div>
                          </div>
                          <div className="absolute top-56 left-1 right-1 bg-orange-100 border-l-4 border-orange-600 rounded p-2 text-xs">
                            <div className="font-semibold text-orange-900">3:00 PM</div>
                            <div className="text-orange-800">Harvest Solutions</div>
                            <div className="text-orange-700">
                              {language === "en" ? "Client Call" : "Llamada cliente"}
                            </div>
                          </div>
                        </div>

                        {/* Wednesday - Today */}
                        <div className="border-r min-h-[400px] relative bg-blue-50">
                          <div className="absolute top-0 left-1 right-1 bg-red-100 border-l-4 border-red-600 rounded p-2 text-xs">
                            <div className="font-semibold text-red-900">8:30 AM</div>
                            <div className="text-red-800">URGENT: AgriTech</div>
                            <div className="text-red-700">{language === "en" ? "Filing Deadline" : "Fecha límite"}</div>
                          </div>
                          <div className="absolute top-32 left-1 right-1 bg-purple-100 border-l-4 border-purple-600 rounded p-2 text-xs">
                            <div className="font-semibold text-purple-900">1:00 PM</div>
                            <div className="text-purple-800">Sunbelt Growers</div>
                            <div className="text-purple-700">
                              {language === "en" ? "Strategy Meeting" : "Reunión estrategia"}
                            </div>
                          </div>
                        </div>

                        {/* Thursday */}
                        <div className="border-r min-h-[400px] relative">
                          <div className="absolute top-16 left-1 right-1 bg-indigo-100 border-l-4 border-indigo-600 rounded p-2 text-xs">
                            <div className="font-semibold text-indigo-900">10:00 AM</div>
                            <div className="text-indigo-800">New Client</div>
                            <div className="text-indigo-700">
                              {language === "en" ? "Initial Consultation" : "Consulta inicial"}
                            </div>
                          </div>
                        </div>

                        {/* Friday */}
                        <div className="border-r min-h-[400px] relative">
                          <div className="absolute top-40 left-1 right-1 bg-teal-100 border-l-4 border-teal-600 rounded p-2 text-xs">
                            <div className="font-semibold text-teal-900">2:00 PM</div>
                            <div className="text-teal-800">Weekly Review</div>
                            <div className="text-teal-700">{language === "en" ? "Team Meeting" : "Reunión equipo"}</div>
                          </div>
                        </div>

                        {/* Saturday */}
                        <div className="border-r min-h-[400px] relative bg-gray-50"></div>

                        {/* Sunday */}
                        <div className="min-h-[400px] relative bg-gray-50"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Visualización del Continuum - Process Continuum */}
              <Tabs defaultValue="h2-filings" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="h2-filings" className="flex items-center gap-2">
                    {t.kanbanView}
                    <LayoutDashboardIcon className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger value="list" className="flex items-center gap-2">
                    {t.listView}
                    <List className="h-4 w-4" />
                  </TabsTrigger>
                </TabsList>

                {/* H2 Filings Tab */}
                <TabsContent value="h2-filings" className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card className="cursor-pointer hover:bg-hover-table transition-colors">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-tertiary-font">
                          {language === "en" ? "Preparation" : "Preparación"}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-blue-600">8</div>
                        <p className="text-xs text-secondary-font mt-1">
                          {language === "en" ? "employers" : "empleadores"}
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="cursor-pointer hover:bg-hover-table transition-colors">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-tertiary-font">
                          {language === "en" ? "Prevailing Wage (9141)" : "Salario Prevalente (9141)"}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-blue-600">15</div>
                        <p className="text-xs text-secondary-font mt-1">
                          {language === "en" ? "employers" : "empleadores"}
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="cursor-pointer hover:bg-hover-table transition-colors">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-tertiary-font">
                          {language === "en" ? "Filing Window (9142)" : "Ventana de Presentación (9142)"}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-blue-600">12</div>
                        <p className="text-xs text-secondary-font mt-1">
                          {language === "en" ? "employers" : "empleadores"}
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="cursor-pointer hover:bg-hover-table transition-colors">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-tertiary-font">
                          {language === "en" ? "USCIS Petition (I-129)" : "Petición USCIS (I-129)"}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-blue-600">5</div>
                        <p className="text-xs text-secondary-font mt-1">
                          {language === "en" ? "employers" : "empleadores"}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Foreign Processing Tab */}
                <TabsContent value="foreign-processing" className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card className="cursor-pointer hover:bg-hover-table transition-colors">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-tertiary-font">
                          {language === "en" ? "Selection" : "Selección"}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-green-600">127</div>
                        <p className="text-xs text-secondary-font mt-1">
                          {language === "en" ? "workers" : "trabajadores"}
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="cursor-pointer hover:bg-hover-table transition-colors">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-tertiary-font">
                          {language === "en" ? "Consular Appointment" : "Cita Consular"}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-green-600">89</div>
                        <p className="text-xs text-secondary-font mt-1">
                          {language === "en" ? "workers" : "trabajadores"}
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="cursor-pointer hover:bg-hover-table transition-colors">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-tertiary-font">
                          {language === "en" ? "Travel Logistics" : "Logística de Viaje"}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-green-600">45</div>
                        <p className="text-xs text-secondary-font mt-1">
                          {language === "en" ? "workers" : "trabajadores"}
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="cursor-pointer hover:bg-hover-table transition-colors">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-tertiary-font">
                          {language === "en" ? "Reimbursements" : "Reembolsos"}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-green-600">23</div>
                        <p className="text-xs text-secondary-font mt-1">
                          {language === "en" ? "workers" : "trabajadores"}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {language === "en" ? "Foreign Processing Tracking" : "Seguimiento de Procesamiento Extranjero"}
                      </CardTitle>
                      <CardDescription>
                        {language === "en"
                          ? "Track worker processing status and consular appointments"
                          : "Seguimiento del estado de procesamiento de trabajadores y citas consulares"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>{language === "en" ? "Worker Name" : "Nombre del Trabajador"}</TableHead>
                              <TableHead>{language === "en" ? "Employer" : "Empleador"}</TableHead>
                              <TableHead>{language === "en" ? "Current Stage" : "Etapa Actual"}</TableHead>
                              <TableHead>{language === "en" ? "Consular Appointment" : "Cita Consular"}</TableHead>
                              <TableHead>{language === "en" ? "Days Until" : "Días Restantes"}</TableHead>
                              <TableHead>{language === "en" ? "Status" : "Estado"}</TableHead>
                              <TableHead>{language === "en" ? "Agent" : "Agente"}</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {[
                              {
                                worker: "Juan García",
                                employer: "Peterson Yards Inc.",
                                stage: "Consular Appointment Scheduled",
                                appointment: "Dec 27, 2025",
                                daysUntil: 1,
                                status: "critical",
                                statusLabel: language === "en" ? "Urgent" : "Urgente",
                                agent: "Oliver Smith",
                              },
                              {
                                worker: "María López",
                                employer: "Green Valley Farms LLC",
                                stage: "Document Review",
                                appointment: "Dec 29, 2025",
                                daysUntil: 3,
                                status: "critical",
                                statusLabel: language === "en" ? "Action Needed" : "Acción Requerida",
                                agent: "Sarah Johnson",
                              },
                              {
                                worker: "Carlos Hernández",
                                employer: "Harvest Solutions Co.",
                                stage: "Selection Complete",
                                appointment: "Jan 2, 2026",
                                daysUntil: 7,
                                status: "warning",
                                statusLabel: language === "en" ? "Pending" : "Pendiente",
                                agent: "Michael Chen",
                              },
                              {
                                worker: "Ana Rodríguez",
                                employer: "AgriTech Partners",
                                stage: "Travel Logistics",
                                appointment: "Jan 5, 2026",
                                daysUntil: 10,
                                status: "normal",
                                statusLabel: language === "en" ? "On Track" : "En Curso",
                                agent: "Emma Davis",
                              },
                              {
                                worker: "Luis Martínez",
                                employer: "Sunbelt Growers Inc.",
                                stage: "Visa Approved",
                                appointment: "Jan 8, 2026",
                                daysUntil: 13,
                                status: "success",
                                statusLabel: language === "en" ? "Approved" : "Aprobado",
                                agent: "Oliver Smith",
                              },
                              {
                                worker: "Sofia Ramírez",
                                employer: "Mountain View Orchards",
                                stage: "Missing Documents",
                                appointment: "Jan 3, 2026",
                                daysUntil: 8,
                                status: "warning",
                                statusLabel: language === "en" ? "Incomplete" : "Incompleto",
                                agent: "Sarah Johnson",
                              },
                            ].map((row, idx) => (
                              <TableRow
                                key={idx}
                                className={
                                  row.status === "critical"
                                    ? "bg-red-50 hover:bg-red-100"
                                    : row.status === "warning"
                                      ? "bg-orange-50 hover:bg-orange-100"
                                      : row.status === "success"
                                        ? "bg-green-50 hover:bg-green-100"
                                        : "hover:bg-hover-table"
                                }
                              >
                                <TableCell className="font-medium">{row.worker}</TableCell>
                                <TableCell className="text-sm">{row.employer}</TableCell>
                                <TableCell className="text-sm">{row.stage}</TableCell>
                                <TableCell className="text-sm">{row.appointment}</TableCell>
                                <TableCell>
                                  <span
                                    className={
                                      row.daysUntil <= 3
                                        ? "font-bold text-red-600"
                                        : row.daysUntil <= 7
                                          ? "font-semibold text-orange-600"
                                          : "text-secondary-font"
                                    }
                                  >
                                    {row.daysUntil} {language === "en" ? "days" : "días"}
                                  </span>
                                </TableCell>
                                <TableCell>
                                  <Badge
                                    variant={
                                      row.status === "success"
                                        ? "success"
                                        : row.status === "critical"
                                          ? "error"
                                          : row.status === "warning"
                                            ? "info"
                                            : "default"
                                    }
                                  >
                                    {row.statusLabel}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-sm">{row.agent}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Tabla Maestra de Seguimiento - Master Tracking Table */}
              <Card>
                <CardHeader>
                  <CardTitle>{language === "en" ? "Master Tracking Table" : "Tabla Maestra de Seguimiento"}</CardTitle>
                  <CardDescription>
                    {language === "en"
                      ? "High-density view of all active cases"
                      : "Vista de alta densidad de todos los casos activos"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{language === "en" ? "Employer" : "Empleador"}</TableHead>
                          <TableHead>{language === "en" ? "Program" : "Programa"}</TableHead>
                          <TableHead>{language === "en" ? "Last Step Completed" : "Último Paso Completado"}</TableHead>
                          <TableHead>{language === "en" ? "Next Legal Deadline" : "Próximo Deadline Legal"}</TableHead>
                          <TableHead>{language === "en" ? "Days Remaining" : "Días Restantes"}</TableHead>
                          <TableHead>{language === "en" ? "Responsible" : "Responsable"}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[
                          {
                            employer: "Peterson Yards Inc.",
                            program: "H2B",
                            lastStep: "ETA-9141 Approved",
                            deadline: "Dec 27, 2025",
                            daysRemaining: 1,
                            responsible: "Oliver Smith",
                            status: "critical",
                          },
                          {
                            employer: "Green Valley Farms LLC",
                            program: "H2A",
                            lastStep: "Awaiting Prevailing Wage",
                            deadline: "Dec 28, 2025",
                            daysRemaining: 2,
                            responsible: "Sarah Johnson",
                            status: "critical",
                          },
                          {
                            employer: "Harvest Solutions Co.",
                            program: "H2A",
                            lastStep: "Documents Pending",
                            deadline: "Dec 30, 2025",
                            daysRemaining: 4,
                            responsible: "Michael Chen",
                            status: "warning",
                          },
                          {
                            employer: "AgriTech Partners",
                            program: "H2B",
                            lastStep: "I-129 Draft Review",
                            deadline: "Jan 3, 2026",
                            daysRemaining: 8,
                            responsible: "Emma Davis",
                            status: "normal",
                          },
                          {
                            employer: "Sunbelt Growers Inc.",
                            program: "H2A",
                            lastStep: "Labor Certification Filed",
                            deadline: "Jan 10, 2026",
                            daysRemaining: 15,
                            responsible: "Oliver Smith",
                            status: "normal",
                          },
                          {
                            employer: "Mountain View Orchards",
                            program: "H2A",
                            lastStep: "Missing Critical Documents",
                            deadline: "Jan 5, 2026",
                            daysRemaining: 10,
                            responsible: "Sarah Johnson",
                            status: "warning",
                          },
                        ].map((row, idx) => (
                          <TableRow
                            key={idx}
                            className={
                              row.status === "critical"
                                ? "bg-red-50 hover:bg-red-100"
                                : row.status === "warning"
                                  ? "bg-orange-50 hover:bg-orange-100"
                                  : "hover:bg-hover-table"
                            }
                          >
                            <TableCell className="font-medium">{row.employer}</TableCell>
                            <TableCell>
                              <Badge variant={row.program === "H2A" ? "default" : "default"}>{row.program}</Badge>
                            </TableCell>
                            <TableCell className="text-sm">{row.lastStep}</TableCell>
                            <TableCell className="text-sm">{row.deadline}</TableCell>
                            <TableCell>
                              <span
                                className={
                                  row.daysRemaining <= 2
                                    ? "font-bold text-red-600"
                                    : row.daysRemaining <= 5
                                      ? "font-semibold text-orange-600"
                                      : "text-secondary-font"
                                }
                              >
                                {row.daysRemaining} {language === "en" ? "days" : "días"}
                              </span>
                            </TableCell>
                            <TableCell className="text-sm">{row.responsible}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "certifications" && (
            <div className="p-0 m-0 text-secondary rounded-xl bg-card border shadow-none px-6 py-6">
              {/* Section Header - Reusable Layout */}
              <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm text-secondary-font">{t.certificationsCount(certifications.length)}</p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-tertiary-font" />
                    <Input
                      placeholder={t.searchEmployers}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "kanban" | "list")}>
                    <TabsList>
                      <TabsTrigger value="kanban" className="flex items-center gap-2">
                        {t.kanbanView}
                        <LayoutDashboardIcon className="h-4 w-4" />
                      </TabsTrigger>
                      <TabsTrigger value="list" className="flex items-center gap-2">
                        {t.listView}
                        <List className="h-4 w-4" />
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <Button className="whitespace-nowrap" onClick={() => setShowAddCertificationPanel(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    {t.addCertification}
                  </Button>
                </div>
              </div>

              {/* Kanban View */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                {/* Column 1: Prevailing Wage Rate */}
                <div className="flex flex-col gap-3">
                  <div className="rounded-lg border border-border bg-background-sidebar p-4 bg-[rgba(243,244,246,1)]">
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-primary-font truncate">{t.prevailingWageRate}</h3>
                        <p className="text-xs text-tertiary-font">{t.step1}</p>
                      </div>
                      <Badge variant="secondary" className="bg-white text-primary-font border-border shrink-0">
                        {step1Count}
                      </Badge>
                    </div>
                  </div>

                  {/* Cards for Step 1 */}
                  {certifications
                    .filter((cert) => cert.step === 1)
                    .map((cert) => (
                      <div
                        key={cert.id}
                        className="bg-white rounded-lg p-4 border border-border hover:bg-[#E7F6FF] transition-colors cursor-pointer"
                        onClick={() => router.push(`/certifications/${cert.id}`)}
                      >
                        <div className="space-y-4">
                          {/* Header with company name and menu */}
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-primary-font">{cert.company}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge className="bg-primary-font text-white px-2 py-0.5 text-xs font-medium">
                                  {cert.visaType}
                                </Badge>
                                <span className="text-sm text-tertiary-font">{cert.certId}</span>
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  {t.viewDetails}
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  {t.edit}
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  {t.delete}
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          {/* Created date with status badge */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-secondary-font">
                              <CalendarIcon className="h-4 w-4" />
                              <span>{cert.created}</span>
                            </div>
                            <Badge variant={cert.status === "Awaiting approval" ? "default" : "info"}>
                              {language === "es"
                                ? cert.status === "Awaiting approval"
                                  ? "Esperando aprobación"
                                  : "Borrador"
                                : cert.status}
                            </Badge>
                          </div>

                          {/* Next Task section */}
                          <div>
                            <p className="text-xs text-tertiary-font mb-1">
                              {language === "es" ? "Siguiente Tarea" : "Next Task"}
                            </p>
                            <p className="text-sm font-medium text-primary-font">{cert.nextTask}</p>
                          </div>

                          {/* Case Manager section with avatar */}
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs text-tertiary-font mb-1">
                                {language === "es" ? "Agente/Gestor de casos" : "Agent/Case manager"}
                              </p>
                              <p className="text-sm font-medium text-primary-font">{cert.caseManager}</p>
                            </div>
                            <Avatar>
                              <AvatarImage
                                src={`/ceholder-svg-key-dbnae.jpg?key=dbnae&height=40&width=40`}
                                alt={cert.caseManager}
                              />
                              <AvatarFallback>
                                {cert.caseManager
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Column 2: Labor Certification */}
                <div className="flex flex-col gap-3">
                  <div className="rounded-lg border border-border bg-background-sidebar p-4 bg-[rgba(243,244,246,1)]">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-primary-font">{t.laborCertification}</h3>
                        <p className="text-xs text-tertiary-font">{t.step2}</p>
                      </div>
                      <Badge variant="secondary" className="bg-white text-primary-font border-border">
                        {step2Count}
                      </Badge>
                    </div>
                  </div>

                  {/* Cards for Step 2 */}
                  {certifications
                    .filter((cert) => cert.step === 2)
                    .map((cert) => (
                      <div
                        key={cert.id}
                        className="bg-white rounded-lg p-4 border border-border hover:bg-[#E7F6FF] transition-colors cursor-pointer"
                        onClick={() => router.push(`/certifications/${cert.id}`)}
                      >
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-primary-font">{cert.company}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge className="bg-primary-font text-white px-2 py-0.5 text-xs font-medium">
                                  {cert.visaType}
                                </Badge>
                                <span className="text-sm text-tertiary-font">{cert.certId}</span>
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  {t.viewDetails}
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  {t.edit}
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  {t.delete}
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-secondary-font">
                              <CalendarIcon className="h-4 w-4" />
                              <span>{cert.created}</span>
                            </div>
                            <Badge variant="info">{language === "es" ? "En Progreso" : "In Progress"}</Badge>
                          </div>

                          <div>
                            <p className="text-xs text-tertiary-font mb-1">
                              {language === "es" ? "Siguiente Tarea" : "Next Task"}
                            </p>
                            <p className="text-sm font-medium text-primary-font">{cert.nextTask}</p>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs text-tertiary-font mb-1">
                                {language === "es" ? "Agente/Gestor de casos" : "Agent/Case manager"}
                              </p>
                              <p className="text-sm font-medium text-primary-font">{cert.caseManager}</p>
                            </div>
                            <Avatar>
                              <AvatarImage
                                src={`/ceholder-svg-key-15e5e.jpg?key=15e5e&height=40&width=40`}
                                alt={cert.caseManager}
                              />
                              <AvatarFallback>
                                {cert.caseManager
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Column 3: I-129 Petition */}
                <div className="flex flex-col gap-3">
                  <div className="rounded-lg border border-border bg-background-sidebar p-4 bg-[rgba(243,244,246,1)]">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-primary-font">{t.i129Petition}</h3>
                        <p className="text-xs text-tertiary-font">{t.step3}</p>
                      </div>
                      <Badge variant="secondary" className="bg-white text-primary-font border-border">
                        {step3Count}
                      </Badge>
                    </div>
                  </div>

                  {/* Cards for Step 3 */}
                  {certifications
                    .filter((cert) => cert.step === 3)
                    .map((cert) => (
                      <div
                        key={cert.id}
                        className="bg-white rounded-lg p-4 border border-border hover:bg-[#E7F6FF] transition-colors cursor-pointer"
                        onClick={() => router.push(`/certifications/${cert.id}`)}
                      >
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-primary-font">{cert.company}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge className="bg-primary-font text-white px-2 py-0.5 text-xs font-medium">
                                  {cert.visaType}
                                </Badge>
                                <span className="text-sm text-tertiary-font">{cert.certId}</span>
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  {t.viewDetails}
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  {t.edit}
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  {t.delete}
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-secondary-font">
                              <CalendarIcon className="h-4 w-4" />
                              <span>{cert.created}</span>
                            </div>
                            <Badge variant="success">{language === "es" ? "Completado" : "Completed"}</Badge>
                          </div>

                          <div>
                            <p className="text-xs text-tertiary-font mb-1">
                              {language === "es" ? "Siguiente Tarea" : "Next Task"}
                            </p>
                            <p className="text-sm font-medium text-primary-font">{cert.nextTask}</p>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs text-tertiary-font mb-1">
                                {language === "es" ? "Agente/Gestor de casos" : "Agent/Case manager"}
                              </p>
                              <p className="text-sm font-medium text-primary-font">{cert.caseManager}</p>
                            </div>
                            <Avatar>
                              <AvatarImage
                                src={`/ceholder-svg-key-kq5ab.jpg?key=kq5ab&height=40&width=40`}
                                alt={cert.caseManager}
                              />
                              <AvatarFallback>
                                {cert.caseManager
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* List View */}
              {viewMode === "list" && (
                <div className="bg-white rounded-lg border border-border p-4">
                  <p className="text-sm text-secondary-font">
                    {language === "en" ? "List view coming soon..." : "Vista de lista próximamente..."}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Add Certification Side Panel */}
      <Sheet open={showAddCertificationPanel} onOpenChange={setShowAddCertificationPanel}>
        <SheetContent side="right" className="sm:max-w-[720px] bg-white overflow-y-auto">
          <SheetHeader className="px-6 pt-6 pb-4 border-b border-border">
            <SheetTitle className="text-xl font-semibold text-primary-font">{t.newH2Certification}</SheetTitle>
            <SheetDescription className="text-sm text-secondary-font">{t.certificationDescription}</SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
            {/* Info Section */}
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-semibold text-primary-font">{t.infoSection}</h3>
                <p className="text-sm text-secondary-font">{t.chooseEmployer}</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-[140px_1fr] gap-4 items-center">
                  <Label htmlFor="employer" className="text-sm text-primary-font">
                    {t.employer}
                  </Label>
                  <Select
                    value={certificationForm.employer}
                    onValueChange={(value) => setCertificationForm({ ...certificationForm, employer: value })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={language === "en" ? "Select employer" : "Seleccionar empleador"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="peterson-yards">Peterson Yards Inc.</SelectItem>
                      <SelectItem value="green-valley">Green Valley Farms LLC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-[140px_1fr] gap-4 items-center">
                  <Label htmlFor="startDate" className="text-sm text-primary-font">
                    {t.anticipatedStartDate}
                  </Label>
                  <Popover>
                    <div className="relative">
                      <Input
                        id="startDate"
                        value={certificationForm.startDate ? certificationForm.startDate.toLocaleDateString() : ""}
                        placeholder={language === "en" ? "Select date" : "Seleccionar fecha"}
                        readOnly
                        className="pr-10 cursor-pointer"
                        onClick={(e) => {
                          e.currentTarget.parentElement?.querySelector("button")?.click()
                        }}
                      />
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        >
                          <CalendarIcon className="h-4 w-4 text-tertiary-font" />
                        </Button>
                      </PopoverTrigger>
                    </div>
                    <PopoverContent className="w-auto p-0 bg-white">
                      <Calendar
                        mode="single"
                        selected={certificationForm.startDate}
                        onSelect={(date) => setCertificationForm({ ...certificationForm, startDate: date })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="grid grid-cols-[140px_1fr] gap-4 items-center">
                  <Label htmlFor="numWorkers" className="text-sm text-primary-font">
                    {t.numberOfWorkers}
                  </Label>
                  <Input
                    id="numWorkers"
                    type="number"
                    min="1"
                    placeholder={language === "en" ? "e.g., 10" : "ej., 10"}
                    value={certificationForm.numWorkers}
                    onChange={(e) => {
                      const value = e.target.value
                      if (value === "" || Number.parseInt(value) > 0) {
                        setCertificationForm({ ...certificationForm, numWorkers: value })
                      }
                    }}
                  />
                </div>

                <div className="grid grid-cols-[140px_1fr] gap-4 items-center">
                  <Label htmlFor="workLocation" className="text-sm text-primary-font">
                    {t.workLocation}
                  </Label>
                  <Input
                    id="workLocation"
                    placeholder={language === "en" ? "e.g., New York, NY" : "ej., Ciudad de México, CDMX"}
                    value={certificationForm.workLocation}
                    onChange={(e) => setCertificationForm({ ...certificationForm, workLocation: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-[140px_1fr] gap-4 items-center">
                  <Label htmlFor="caseManager" className="text-sm text-primary-font">
                    {t.assignedCaseManager}
                  </Label>
                  <Select
                    value={certificationForm.caseManager}
                    onValueChange={(value) => setCertificationForm({ ...certificationForm, caseManager: value })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={language === "en" ? "Select case manager" : "Seleccionar gestor"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="john-doe">John Doe</SelectItem>
                      <SelectItem value="jane-smith">Jane Smith</SelectItem>
                      <SelectItem value="mike-johnson">Mike Johnson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Visa Section */}
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-semibold text-primary-font">{t.visaSection}</h3>
                <p className="text-sm text-secondary-font">{t.chooseVisaCategory}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-sm text-primary-font mb-3 block">{t.selectVisaType}</Label>
                  <RadioGroup
                    value={certificationForm.visaType}
                    onValueChange={(value) => setCertificationForm({ ...certificationForm, visaType: value })}
                    className="grid grid-cols-2 gap-3"
                  >
                    <div className="flex items-center space-x-2 border border-border rounded-md p-3 hover:bg-[#E7F6FF] cursor-pointer">
                      <RadioGroupItem value="h2a" id="h2a" />
                      <Label htmlFor="h2a" className="text-sm cursor-pointer flex-1">
                        {t.visaH2A}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border border-border rounded-md p-3 hover:bg-[#E7F6FF] cursor-pointer">
                      <RadioGroupItem value="h2b" id="h2b" />
                      <Label htmlFor="h2b" className="text-sm cursor-pointer flex-1">
                        {t.visaH2B}
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label className="text-sm text-primary-font mb-3 block">{t.modality}</Label>
                  <RadioGroup
                    value={certificationForm.modality}
                    onValueChange={(value) => setCertificationForm({ ...certificationForm, modality: value })}
                    className="grid grid-cols-2 gap-3"
                  >
                    <div className="flex items-center space-x-2 border border-border rounded-md p-3 hover:bg-[#E7F6FF] cursor-pointer">
                      <RadioGroupItem value="unnamed" id="unnamed" />
                      <Label htmlFor="unnamed" className="text-sm cursor-pointer flex-1">
                        {t.unnamed}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border border-border rounded-md p-3 hover:bg-[#E7F6FF] cursor-pointer">
                      <RadioGroupItem value="named" id="named" />
                      <Label htmlFor="named" className="text-sm cursor-pointer flex-1">
                        {t.named}
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>

            {/* Documents Section */}
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-semibold text-primary-font">{t.documentsSection}</h3>
                <p className="text-sm text-secondary-font">{t.uploadDocuments}</p>
              </div>

              <Alert className="bg-[#E7F6FF] border-[#81C6FF] text-primary-font">
                <Info className="h-4 w-4 text-[#0B38A4]" />
                <div className="ml-2 text-sm">{t.documentsTip}</div>
              </Alert>

              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:bg-[#E7F6FF] transition-colors cursor-pointer">
                <Upload className="mx-auto h-8 w-8 text-tertiary-font mb-3" />
                <p className="text-sm text-secondary-font">{t.dragDrop}</p>
              </div>
            </div>
          </div>

          {/* Sticky Footer */}
          <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-border p-4 flex gap-3 justify-end">
            <Button variant="secondary" onClick={() => setShowAddCertificationPanel(false)}>
              {t.cancel}
            </Button>
            <Button onClick={handleCreateCertification}>{t.createCertification}</Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

const deployments = [
  { id: "8JfpcWAW", environment: "Preview", status: "Ready", time: "7m 24s (5m ago)" },
  { id: "BCotKPg4n", environment: "Production", status: "Ready", time: "5m 2s (33m ago)" },
  { id: "1i3VpKTef", environment: "Preview", status: "Ready", time: "6m 19s (1h ago)" },
  { id: "3meKh6Dve", environment: "Production", status: "Ready", time: "4m 46s (2h ago)" },
  { id: "EdKwQiYgv", environment: "Preview", status: "Ready", time: "5m 64s (2h ago)" },
]

export { Dashboard }
