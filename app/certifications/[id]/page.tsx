"use client"

import type React from "react"
import { useParams, useRouter } from "next/navigation"
import { ChevronLeft, Upload, MoreVertical, Eye, FileText, Check, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info } from "lucide-react"
import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"

interface UploadingFile {
  file: File
  progress: number
  completed: boolean
}

export default function CertificationDetailPage() {
  const { language, t } = useLanguage()
  const params = useParams()
  const router = useRouter()
  const certificationId = params.id as string

  const [showSourceDocsModal, setShowSourceDocsModal] = useState(false)
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setUploadingFiles((prev) =>
        prev.map((item) => {
          if (item.completed) return item
          const newProgress = Math.min(item.progress + Math.random() * 15, 100)
          return {
            ...item,
            progress: newProgress,
            completed: newProgress >= 100,
          }
        }),
      )
    }, 200)

    return () => clearInterval(interval)
  }, [])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        file,
        progress: 0,
        completed: false,
      }))
      setUploadingFiles((prev) => [...prev, ...newFiles])
    }
  }

  const handleRemoveFile = (index: number) => {
    setUploadingFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
  }

  const handleContinue = () => {
    setShowSourceDocsModal(false)
    router.push(`/certifications/${certificationId}/forms/eta-9141?autofill=true`)
  }

  const handleSkipUpload = () => {
    setShowSourceDocsModal(false)
    router.push(`/certifications/${certificationId}/forms/eta-9141`)
  }

  const certification = {
    id: "PET-2025-001234",
    employer: "Peterson Yards Inc",
    employerAddress: "123 Farm Road, Salinas, CA 93901",
    visaType: "H2B",
    modality: "Unnamed",
    workers: 30,
    startDate: "March - October 2026",
    workLocation: "1234 Farm Road, Fresno, CA 93725",
    caseManager: "John Smith",
    caseManagerEmail: "john.smith@mail.com",
    createdDate: "2025-10-15",
    currentStep: "prevailing-wage",
    currentStepStatus: "Draft",
    processingTime: "[$X] days",
    deadline: "11/2/2025",
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Breadcrumb header */}
      <div className="bg-white border-b border-border px-4 sm:px-6 py-3">
        <div className="max-w-full mx-auto flex items-center gap-2 text-sm">
          <button
            onClick={() => router.push("/?section=certifications")}
            className="flex items-center gap-1 text-secondary-font hover:text-primary-font transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-secondary-font">Certifications</span>
          <span className="text-secondary-font">/</span>
          <span className="text-primary-font font-medium">{certification.id}</span>
        </div>
      </div>

      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg border border-border p-6 mb-6">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl font-semibold text-[#0038D0] flex items-center gap-2 flex-wrap">
                <span className="break-words">
                  {certification.employer} - {certification.visaType} 2025
                </span>
                <button className="text-tertiary-font hover:text-primary-font shrink-0">
                  <Eye className="h-5 w-5" />
                </button>
              </h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm">
                <span className="text-secondary-font">
                  ID: <span className="text-primary-font font-medium">{certification.id}</span>
                </span>
                <span className="text-secondary-font">
                  Created:{" "}
                  <span className="text-primary-font font-medium">
                    {new Date(certification.createdDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </span>
                <span className="text-secondary-font">
                  Case manager: <span className="text-primary-font font-medium">{certification.caseManager}</span>
                </span>
              </div>
            </div>
            <button className="text-tertiary-font hover:text-primary-font shrink-0">
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>

          {/* Progress stepper */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-0 mb-6">
            {/* Prevailing Wage Rate - Active */}
            <div className="flex flex-col">
              <div className="flex items-center gap-0">
                <div className="h-6 w-6 rounded-full border-2 border-[#0045FF] flex items-center justify-center shrink-0">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#0045FF]" />
                </div>
                <div className="flex-1 h-1 bg-[#0045FF] hidden sm:block" />
              </div>
              <div className="mt-2">
                <h3 className="font-semibold text-primary-font text-sm">Prevailing Wage Rate</h3>
                <p className="text-xs text-tertiary-font">Draft</p>
              </div>
            </div>

            {/* Labor Certification - Not Started */}
            <div className="flex flex-col">
              <div className="flex items-center gap-0">
                <div className="h-6 w-6 rounded-full border-2 border-[#D4D4D4] bg-white shrink-0" />
                <div className="flex-1 h-1 bg-[#D4D4D4] hidden sm:block" />
              </div>
              <div className="mt-2">
                <h3 className="font-semibold text-tertiary-font text-sm">Labor Certification</h3>
                <p className="text-xs text-tertiary-font">No Started</p>
              </div>
            </div>

            {/* I-129 Petition - Not Started */}
            <div className="flex flex-col">
              <div className="flex items-center gap-0">
                <div className="h-6 w-6 rounded-full border-2 border-[#D4D4D4] bg-white shrink-0" />
              </div>
              <div className="mt-2">
                <h3 className="font-semibold text-tertiary-font text-sm">I-129 Petitionq</h3>
                <p className="text-xs text-tertiary-font">No Started</p>
              </div>
            </div>
          </div>

          {/* Status card */}
          <div className="bg-[#D3EFFF] rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs text-secondary-font mb-1">Current Status</p>
              <p className="font-semibold text-primary-font">Draft - Awaiting completion</p>
            </div>
            <div className="text-left sm:text-right w-full sm:w-auto">
              <p className="text-xs text-secondary-font mb-2">Next Task</p>
              <Button className="mb-1 w-full sm:w-auto" onClick={() => setShowSourceDocsModal(true)}>
                Complete ETA9141
              </Button>
              <p className="text-xs text-tertiary-font">Deadline: {certification.deadline}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          {/* Left column: Tabs content */}
          <div className="min-w-0">
            <Tabs defaultValue="documents">
              <TabsList variant="line">
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="forms">Forms</TabsTrigger>
              </TabsList>
              <TabsContent value="documents" className="mt-4">
                <div className="bg-white rounded-lg p-4 sm:p-6 border border-border">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-semibold text-primary-font">Documents</h2>
                      <p className="text-sm text-tertiary-font">0 Document uploaded</p>
                    </div>
                    <Button variant="outline" size="sm" className="w-full sm:w-auto bg-transparent">
                      <Upload className="h-4 w-4 mr-2" />
                      Add Document
                    </Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="forms" className="mt-4">
                <div className="bg-white rounded-lg p-4 sm:p-6 border border-border">
                  <h2 className="text-lg font-semibold text-primary-font mb-4">Forms</h2>
                  <p className="text-sm text-tertiary-font">No forms available yet</p>
                </div>
              </TabsContent>
            </Tabs>

            {uploadingFiles.filter((f) => f.completed).length > 0 && (
              <div className="border border-border rounded-lg p-4 bg-white mt-4">
                <h3 className="font-medium text-primary-font mb-3">Source documents</h3>
                <div className="space-y-2">
                  {uploadingFiles
                    .filter((f) => f.completed)
                    .map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-[#E8F5E9] rounded-lg">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="h-8 w-8 rounded-full bg-[#4CAF50] flex items-center justify-center shrink-0">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                          <div className="min-w-0">
                            <span className="text-sm truncate block">{item.file.name}</span>
                            <span className="text-xs text-tertiary-font">{formatFileSize(item.file.size)}</span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveFile(uploadingFiles.indexOf(item))}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* Right column: Information panel */}
          <div className="lg:sticky lg:top-6 h-fit">
            <div className="bg-[#FAFAFA] rounded-lg border border-border p-6">
              <h2 className="text-lg font-semibold text-primary-font mb-6">Information</h2>

              <div className="space-y-5">
                <div className="grid grid-cols-[120px_1fr] gap-2 items-start">
                  <span className="text-sm text-tertiary-font">Employer</span>
                  <div className="text-sm text-primary-font font-medium">
                    <p>{certification.employer}</p>
                    <p className="font-normal text-secondary-font">{certification.employerAddress}</p>
                  </div>
                </div>

                <div className="grid grid-cols-[120px_1fr] gap-2 items-start">
                  <span className="text-sm text-tertiary-font">Visa Type</span>
                  <span className="text-sm text-primary-font font-medium">
                    {certification.visaType} - {certification.modality}
                  </span>
                </div>

                <div className="grid grid-cols-[120px_1fr] gap-2 items-start">
                  <span className="text-sm text-tertiary-font">Workers</span>
                  <span className="text-sm text-primary-font font-medium">{certification.workers}</span>
                </div>

                <div className="grid grid-cols-[120px_1fr] gap-2 items-start">
                  <span className="text-sm text-tertiary-font">Anticipated Start Date</span>
                  <span className="text-sm text-primary-font font-medium">{certification.startDate}</span>
                </div>

                <div className="grid grid-cols-[120px_1fr] gap-2 items-start">
                  <span className="text-sm text-tertiary-font">Work Location</span>
                  <span className="text-sm text-primary-font font-medium break-words">
                    {certification.workLocation}
                  </span>
                </div>

                <div className="grid grid-cols-[120px_1fr] gap-2 items-start">
                  <span className="text-sm text-tertiary-font">Responsible Agent</span>
                  <div className="text-sm text-primary-font font-medium">
                    <p>{certification.caseManager}</p>
                    <p className="font-normal text-secondary-font">{certification.caseManagerEmail}</p>
                  </div>
                </div>

                <div className="grid grid-cols-[120px_1fr] gap-2 items-start">
                  <span className="text-sm text-tertiary-font">Processing Time</span>
                  <span className="text-sm text-primary-font font-medium">{certification.processingTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Source Documents Modal */}
      <Dialog open={showSourceDocsModal} onOpenChange={setShowSourceDocsModal}>
        <DialogContent className="max-w-[720px]">
          <DialogHeader>
            <DialogTitle className="text-2xl text-primary">{t.sourceDocuments}</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{t.sourceDocumentsUploaded(uploadingFiles.length)}</p>
              <Button variant="outline" size="sm" onClick={() => document.getElementById("file-upload-modal")?.click()}>
                <Upload className="h-4 w-4 mr-2" />
                {t.addSourceDocument}
              </Button>
              <input
                id="file-upload-modal"
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>

            <Alert className="bg-[#E3F2FD] border-[#2196F3]">
              <Info className="h-4 w-4 text-[#2196F3]" />
              <AlertDescription className="text-[#1976D2]">{t.uploadTip}</AlertDescription>
            </Alert>

            <div className="border border-[#D4D4D4] rounded-lg p-4">
              <p className="text-sm text-tertiary-font mb-4">Source Documents</p>

              {uploadingFiles.length === 0 ? (
                <p className="text-sm text-tertiary-font text-center py-8">
                  {language === "es" ? "No hay documentos agregados" : "No documents added"}
                </p>
              ) : (
                <div className="space-y-3">
                  {uploadingFiles.map((item, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg transition-colors ${item.completed ? "bg-[#E8F5E9]" : "bg-[#F5F5F5]"}`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Icon - File or Check based on completion */}
                        <div
                          className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${
                            item.completed ? "bg-[#4CAF50]" : "bg-[#E0E0E0]"
                          }`}
                        >
                          {item.completed ? (
                            <Check className="h-5 w-5 text-white" />
                          ) : (
                            <FileText className="h-5 w-5 text-[#757575]" />
                          )}
                        </div>

                        {/* File info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-primary-font truncate">{item.file.name}</p>
                          <p className="text-xs text-tertiary-font mt-0.5">
                            {item.completed
                              ? formatFileSize(item.file.size)
                              : `${formatFileSize((item.file.size * item.progress) / 100)} / ${formatFileSize(item.file.size)}`}
                          </p>

                          {/* Progress bar - only show if not completed */}
                          {!item.completed && (
                            <div className="mt-2 h-1.5 bg-[#E0E0E0] rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#0045FF] rounded-full transition-all duration-200"
                                style={{ width: `${item.progress}%` }}
                              />
                            </div>
                          )}
                        </div>

                        {/* Delete button */}
                        <button
                          onClick={() => handleRemoveFile(index)}
                          className="p-2 text-[#9E9E9E] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <Button variant="outline" onClick={handleSkipUpload}>
                {t.skipUpload}
              </Button>
              <Button onClick={handleContinue}>{t.continue}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
