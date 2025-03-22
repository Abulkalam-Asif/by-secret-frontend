import { useMutation, useQuery } from "@apollo/client";
import { useMemo, useRef, useState, useEffect } from "react";
import { GET_WIKI, UPDATE_WIKI } from "../../graphql/wiki";
import Button from "../../components/general/Button";

type ClientOnlyProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

// Client-only wrapper component
function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? children : fallback;
}

export default function AdminWiki() {
  const { data, loading: gettingWiki } = useQuery(GET_WIKI);
  const [updateWikiMutation] = useMutation(UPDATE_WIKI);

  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [JoditEditor, setJoditEditor] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(true);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: gettingWiki || content ? "" : "Start typing here...",
    }),
    []
  );

  useEffect(() => {
    if (data?.getWiki) {
      setContent(data.getWiki.content);
      // Convert Unix timestamp to formatted date string
      const timestamp = parseInt(data.getWiki.updatedAt);
      const formattedDate = isNaN(timestamp)
        ? data.getWiki.updatedAt
        : new Date(timestamp).toLocaleString();
      setLastUpdated(formattedDate);
    }
  }, [data]);

  // Dynamically import JoditEditor only on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("jodit-react").then((module) => {
        setJoditEditor(() => module.default);
      });
    }
  }, []);

  const saveHandler = async () => {
    const response = await updateWikiMutation({
      variables: { content },
    });
    if (response.data?.updateWiki) {
      // Format current timestamp when saving
      const formattedDate = new Date().toLocaleString();
      setLastUpdated(formattedDate);
      alert("Wiki updated successfully!");
    }
  };

  return (
    <section >
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-theme-gray">Wiki</h1>
          <p className="text-sm text-gray-500 mt-2">
            Update the software wiki documentation here.
            {lastUpdated && (
              <span className="ml-2 italic">Last updated: {lastUpdated}</span>
            )}
          </p>
        </div>

        <div className="mb-4 flex justify-end">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              onClick={() => setShowPreview(true)}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg border cursor-pointer ${
                showPreview
                  ? "bg-theme-blue text-white border-theme-blue"
                  : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
              }`}>
              Preview
            </button>
            <button
              type="button"
              onClick={() => setShowPreview(false)}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg border cursor-pointer ${
                !showPreview
                  ? "bg-theme-blue text-white border-theme-blue"
                  : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
              }`}>
              Edit
            </button>
          </div>
        </div>

        {showPreview ? (
          <div
            className="jodit-preview-container border border-gray-200 rounded-lg p-4 min-h-[300px] prose max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : (
          <ClientOnly
            fallback={
              <div className="border border-gray-200 rounded-lg p-4">
                Editor loading...
              </div>
            }>
            {JoditEditor && (
              <JoditEditor
                ref={editor}
                value={content}
                config={config}
                tabIndex={1}
                onBlur={(newContent: string) => setContent(newContent)}
                onChange={(newContent: string) => setContent(newContent)}
              />
            )}
          </ClientOnly>
        )}

        <div className="mt-8">
          <Button onClick={saveHandler} text="Save Wiki" />
        </div>
      </div>
    </section>
  );
}
