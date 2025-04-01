import { useMutation, useQuery } from "@apollo/client";
import { useRef, useState, useEffect } from "react";
import { GET_WIKI, UPDATE_WIKI } from "../../graphql/wiki";
import Button from "../../components/general/Button";
import JoditEditor from "jodit-react";
import Loader from "../../components/general/Loader";
import { useAlert } from "../../contexts/AlertContext";

export default function AdminWiki() {
  const { showAlert } = useAlert();
  const { data: wikiData, loading: loadingWiki } = useQuery(GET_WIKI);
  const [updateWikiMutation, { loading: loadingUpdateWiki }] = useMutation(
    UPDATE_WIKI,
    {
      refetchQueries: [GET_WIKI],
    }
  );

  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(true);

  useEffect(() => {
    if (wikiData?.getWiki) {
      setContent(wikiData.getWiki.content);
      // Convert Unix timestamp to formatted date string
      const timestamp = parseInt(wikiData.getWiki.updatedAt);
      const formattedDate = isNaN(timestamp)
        ? wikiData.getWiki.updatedAt
        : new Date(timestamp).toLocaleString();
      setLastUpdated(formattedDate);
    }
  }, [wikiData]);

  const saveHandler = async () => {
    const response = await updateWikiMutation({
      variables: { content },
    });
    showAlert({
      type: response.data?.updateWiki.success ? "success" : "error",
      message: response.data?.updateWiki.message,
    });
  };

  return (
    <section>
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

        {loadingWiki ? (
          <Loader text="Loading wiki..." />
        ) : (
          <>
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
              <JoditEditor
                ref={editor}
                value={content}
                tabIndex={1}
                onBlur={(newContent: string) => setContent(newContent)}
                onChange={(newContent: string) => setContent(newContent)}
              />
            )}
          </>
        )}
        <div className="mt-8">
          <Button
            onClick={saveHandler}
            text={loadingUpdateWiki ? "Saving..." : "Save"}
            disabled={loadingUpdateWiki}
          />
        </div>
      </div>
    </section>
  );
}
