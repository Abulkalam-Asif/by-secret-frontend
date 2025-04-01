import { useState, useEffect } from "react";
import Button from "../../components/general/Button";
import { useAlert } from "../../contexts/AlertContext";
import Th from "../../components/general/Th";
import Td from "../../components/general/Td";
import AdminEmailTemplateModal from "../../components/admin/AdminEmailTemplateModal";
import { EmailTemplate } from "../../types";

// Define the template type

const AdminEmailTemplates = () => {
  const { showAlert } = useAlert();

  // State for managing email templates list
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] =
    useState<EmailTemplate | null>(null);

  // New template state
  const [newTemplateName, setNewTemplateName] = useState("");
  const [newTemplateContent, setNewTemplateContent] = useState("");
  const [newTemplateActive, setNewTemplateActive] = useState(true);

  // Mock initial templates - in a real app, fetch from API
  useEffect(() => {
    // Simulate fetching templates from backend
    setTemplates([
      {
        id: 1,
        name: "Advertiser Registration",
        content: `
          <h2>Welcome to {company_name}!</h2>
          <p>Hello {user_full_name},</p>
          <p>Thank you for registering as an advertiser on {date}.</p>
          <p>Please click the link below to verify your account:</p>
          <p><a href="{verification_link}">Verify Account</a></p>
          <p>Best regards,<br>{company_name} Team</p>
        `,
        active: true,
      },
      {
        id: 2,
        name: "Forgot Password",
        content: `
          <h2>{company_name} - Password Reset</h2>
          <p>Hello {user_full_name},</p>
          <p>We received a request to reset your password.</p>
          <p>Please click the link below to set a new password:</p>
          <p><a href="{reset_password_link}">Reset Password</a></p>
          <p>If you didn't request this, please ignore this email.</p>
          <p>Best regards,<br>{company_name} Team</p>
        `,
        active: true,
      },
    ]);
  }, []);

  // Open template modal
  const openTemplateModal = (template?: EmailTemplate) => {
    if (template) {
      setSelectedTemplate(template);
      setNewTemplateName(template.name);
      setNewTemplateContent(template.content);
      setNewTemplateActive(template.active);
    } else {
      setSelectedTemplate(null);
      setNewTemplateName("");
      setNewTemplateContent("");
      setNewTemplateActive(true);
    }
    setIsModalOpen(true);
  };

  // Close template modal
  const closeTemplateModal = () => {
    setIsModalOpen(false);
    setSelectedTemplate(null);
    setNewTemplateName("");
    setNewTemplateContent("");
    setNewTemplateActive(true);
  };

  // Save template
  const saveTemplate = () => {
    if (!newTemplateName.trim()) {
      showAlert({ type: "error", message: "Template name is required" });
      return;
    }

    if (selectedTemplate) {
      // Update existing template
      setTemplates((prevTemplates) =>
        prevTemplates.map((template) =>
          template.id === selectedTemplate.id
            ? {
                ...template,
                name: newTemplateName,
                content: newTemplateContent,
                active: newTemplateActive,
              }
            : template
        )
      );
      showAlert({ type: "success", message: "Template updated successfully" });
    } else {
      // Add new template
      const newId = Math.max(0, ...templates.map((t) => t.id)) + 1;
      setTemplates((prevTemplates) => [
        ...prevTemplates,
        {
          id: newId,
          name: newTemplateName,
          content: newTemplateContent,
          active: newTemplateActive,
        },
      ]);
      showAlert({ type: "success", message: "Template added successfully" });
    }

    closeTemplateModal();
  };

  // Toggle template active status
  const toggleTemplateStatus = (id: number) => {
    setTemplates((prevTemplates) =>
      prevTemplates.map((template) =>
        template.id === id
          ? { ...template, active: !template.active }
          : template
      )
    );
  };

  // Insert shortcode function with proper TypeScript types
  const insertShortcode = (shortcode: string): void => {
    setNewTemplateContent((prev) => prev + shortcode);
  };

  return (
    <section>
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-theme-gray">
              Email Templates
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Manage email templates used by the system
            </p>
          </div>
          <div>
            <Button
              text="+ Add New Template"
              onClick={() => openTemplateModal()}
            />
          </div>
        </div>

        {/* Templates Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-fit">
            <thead>
              <tr>
                <Th>ID</Th>
                <Th>Template Name</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {templates.map((template) => (
                <tr
                  key={template.id}
                  className="border-b border-gray-200 hover:bg-gray-50">
                  <Td>{template.id}</Td>
                  <Td>{template.name}</Td>
                  <Td>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        template.active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                      {template.active ? "Active" : "Inactive"}
                    </span>
                  </Td>
                  <Td>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openTemplateModal(template)}
                        className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                        Edit
                      </button>
                      <button
                        onClick={() => toggleTemplateStatus(template.id)}
                        className={`px-2 py-1 text-xs rounded ${
                          template.active
                            ? "bg-red-100 text-red-700 hover:bg-red-200"
                            : "bg-green-100 text-green-700 hover:bg-green-200"
                        }`}>
                        {template.active ? "Deactivate" : "Activate"}
                      </button>
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Template Modal */}
        {isModalOpen && (
          <AdminEmailTemplateModal
            selectedTemplate={selectedTemplate}
            newTemplateName={newTemplateName}
            setNewTemplateName={setNewTemplateName}
            newTemplateContent={newTemplateContent}
            setNewTemplateContent={setNewTemplateContent}
            newTemplateActive={newTemplateActive}
            setNewTemplateActive={setNewTemplateActive}
            closeTemplateModal={closeTemplateModal}
            saveTemplate={saveTemplate}
            insertShortcode={insertShortcode}
          />
        )}
      </div>
    </section>
  );
};

export default AdminEmailTemplates;
