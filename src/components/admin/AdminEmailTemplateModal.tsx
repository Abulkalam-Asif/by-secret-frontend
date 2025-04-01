import React, { useRef, useState } from "react";
import { EmailTemplate } from "../../types";
import InputBox from "../general/InputBox";
import JoditEditor from "jodit-react";
import Button from "../general/Button";
import Select from "../general/Select";

type AdminEmailTemplateModal = {
  selectedTemplate: EmailTemplate | null;
  newTemplateName: string;
  setNewTemplateName: (name: string) => void;
  newTemplateContent: string;
  setNewTemplateContent: (content: string) => void;
  newTemplateActive: boolean;
  setNewTemplateActive: (active: boolean) => void;
  closeTemplateModal: () => void;
  saveTemplate: () => void;
  insertShortcode: (shortcode: string) => void;
};

const AdminEmailTemplateModal = ({
  selectedTemplate,
  newTemplateName,
  setNewTemplateName,
  newTemplateContent,
  setNewTemplateContent,
  newTemplateActive,
  setNewTemplateActive,
  closeTemplateModal,
  saveTemplate,
  insertShortcode,
}: AdminEmailTemplateModal) => {
  // Editor ref
  const editorRef = useRef(null);
  // State to track selected shortcode
  const [selectedShortcode, setSelectedShortcode] = useState("");

  // Shortcodes reference
  const availableShortcodes = [
    "{user_full_name}",
    "{user_email}",
    "{company_name}",
    "{date}",
    "{verification_link}",
    "{reset_password_link}",
    "{login_link}",
  ];

  // Convert shortcodes to options format
  const shortcodeOptions = [
    { value: "", label: "Select a shortcode" },
    ...availableShortcodes.map((code) => ({
      value: code,
      label: code,
    })),
  ];

  // Handle shortcode selection
  const handleShortcodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedShortcode(e.target.value);
  };

  // Handle shortcode insertion
  const handleInsertShortcode = () => {
    if (selectedShortcode) {
      insertShortcode(selectedShortcode);
      setSelectedShortcode("");
    }
  };

  return (
    <>
      <div
        onClick={closeTemplateModal}
        className="fixed inset-0 z-50 flex items-center justify-center bg-white/40 backdrop-blur-lg">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl w-full max-h-[80vh] overflow-y-auto">
          <h2 className="text-2xl font-bold text-theme-gray mb-4">
            {selectedTemplate
              ? "Edit Email Template"
              : "Add New Email Template"}
          </h2>

          <form>
            <div className="space-y-6">
              {/* Template Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Template Name
                </label>
                <InputBox
                  name="templateName"
                  id="templateName"
                  type="text"
                  value={newTemplateName}
                  placeholder="Enter template name"
                  onChange={(e) => setNewTemplateName(e.target.value)}
                  required={true}
                />
              </div>

              {/* Template Content with Shortcodes */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Template Content
                  </label>
                  <div className="flex items-center space-x-2">
                    <Select
                      name="shortcode"
                      id="shortcode"
                      value={selectedShortcode}
                      options={shortcodeOptions}
                      onChange={handleShortcodeChange}
                      required={false}
                      disabled={false}
                      className="py-1 text-sm"
                    />
                    <button
                      type="button"
                      onClick={handleInsertShortcode}
                      disabled={!selectedShortcode}
                      className={`text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 py-1 px-3 rounded ${
                        !selectedShortcode
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}>
                      Insert
                    </button>
                  </div>
                </div>
                <JoditEditor
                  ref={editorRef}
                  value={newTemplateContent}
                  tabIndex={1}
                  onBlur={(newContent) => setNewTemplateContent(newContent)}
                  onChange={(newContent) => setNewTemplateContent(newContent)}
                />
              </div>

              {/* Active Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <div className="flex items-center space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-theme-blue"
                      checked={newTemplateActive}
                      onChange={() => setNewTemplateActive(true)}
                    />
                    <span className="ml-2">Active</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-theme-blue"
                      checked={!newTemplateActive}
                      onChange={() => setNewTemplateActive(false)}
                    />
                    <span className="ml-2">Inactive</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6 space-x-4">
              <Button
                text="Cancel"
                onClick={closeTemplateModal}
                type="button"
              />
              <Button
                text={selectedTemplate ? "Update Template" : "Add Template"}
                type="submit"
                onClick={saveTemplate}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminEmailTemplateModal;
