import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { Award, BadgeCheck, Plus, Upload, X, FileText, Trash2 } from "lucide-react";

const STORAGE_KEY = "portfolio_certifications";
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_TYPES = ["application/pdf", "image/png", "image/jpeg", "image/jpg"];
const ACCEPTED_EXTENSIONS = ".pdf,.png,.jpg,.jpeg";

type Certification = {
  id: string;
  title: string;
  issuer: string;
  year: string;
  description: string;
  badge: string;
  tag: string;
  fileName: string;
  fileType: string;
  fileDataUrl: string;
};

function loadCertifications(): Certification[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveCertifications(certs: Certification[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(certs));
  } catch {
    // localStorage full or unavailable
  }
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function Certifications() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [certifications, setCertifications] = useState<Certification[]>(loadCertifications);
  const [formData, setFormData] = useState({ title: "", issuer: "", year: "", badge: "", tag: "", description: "" });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string>("");
  const [fileError, setFileError] = useState("");

  useEffect(() => {
    saveCertifications(certifications);
  }, [certifications]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileError("");

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setFileError(`Invalid file type "${file.type || "unknown"}". Accepted: PDF, PNG, JPG.`);
      e.target.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setFileError(`File too large (${formatFileSize(file.size)}). Maximum: 5 MB.`);
      e.target.value = "";
      return;
    }

    setSelectedFile(file);

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (ev) => setFilePreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setFilePreview("");
    }
  }, []);

  const removeFile = useCallback(() => {
    setSelectedFile(null);
    setFilePreview("");
    setFileError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const handleAddCredential = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!formData.title || !formData.issuer || !formData.year) return;
      if (!selectedFile) {
        setFileError("Please select a certificate file.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (ev) => {
        const newCert: Certification = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
          title: formData.title,
          issuer: formData.issuer,
          year: formData.year,
          description: formData.description,
          badge: formData.badge,
          tag: formData.tag,
          fileName: selectedFile.name,
          fileType: selectedFile.type,
          fileDataUrl: ev.target?.result as string,
        };

        setCertifications((current) => [newCert, ...current]);
        setFormData({ title: "", issuer: "", year: "", badge: "", tag: "", description: "" });
        removeFile();
      };
      reader.readAsDataURL(selectedFile);
    },
    [formData, selectedFile, removeFile]
  );

  const removeCertification = useCallback((id: string) => {
    setCertifications((current) => current.filter((c) => c.id !== id));
  }, []);

  const isImage = (type: string) => type.startsWith("image/");

  return (
    <section id="certifications" className="py-12 md:py-16 px-6 relative scroll-mt-24">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4 }}
            className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider text-violet-400 border border-violet-400/20 rounded-full bg-violet-400/5 uppercase mb-4"
          >
            Certifications
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 leading-tight overflow-visible">
            Recognized{" "}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              Achievements
            </span>
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg leading-8">
            Credentials and training that support my work in data science, AI, and analytics.
          </p>
        </motion.div>

        <form
          onSubmit={handleAddCredential}
          className="mb-8 rounded-3xl border border-violet-500/20 bg-slate-900/60 p-6 backdrop-blur-md"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="flex-1">
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Credential title <span className="text-red-400">*</span>
              </label>
              <input
                required
                value={formData.title}
                onChange={(e) => setFormData((c) => ({ ...c, title: e.target.value }))}
                placeholder="e.g. AWS Certified Data Engineer"
                className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-slate-200 outline-none transition focus:border-violet-400"
              />
            </div>
            <div className="flex-1">
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Issuer <span className="text-red-400">*</span>
              </label>
              <input
                required
                value={formData.issuer}
                onChange={(e) => setFormData((c) => ({ ...c, issuer: e.target.value }))}
                placeholder="e.g. AWS"
                className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-slate-200 outline-none transition focus:border-violet-400"
              />
            </div>
            <div className="w-full md:w-28">
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Year <span className="text-red-400">*</span>
              </label>
              <input
                required
                value={formData.year}
                onChange={(e) => setFormData((c) => ({ ...c, year: e.target.value }))}
                placeholder="2025"
                className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-slate-200 outline-none transition focus:border-violet-400"
              />
            </div>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Badge label</label>
              <input
                value={formData.badge}
                onChange={(e) => setFormData((c) => ({ ...c, badge: e.target.value }))}
                placeholder="Verified Credential"
                className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-slate-200 outline-none transition focus:border-violet-400"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Tag</label>
              <input
                value={formData.tag}
                onChange={(e) => setFormData((c) => ({ ...c, tag: e.target.value }))}
                placeholder="License Ready"
                className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-slate-200 outline-none transition focus:border-violet-400"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-2 block text-sm font-medium text-slate-300">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData((c) => ({ ...c, description: e.target.value }))}
              placeholder="Share what the credential covers"
              rows={3}
              className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-slate-200 outline-none transition focus:border-violet-400"
            />
          </div>

          <div className="mt-4">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Certificate file <span className="text-red-400">*</span>
              <span className="ml-2 text-xs text-slate-500 font-normal">(PDF, PNG, JPG — max 5 MB)</span>
            </label>
            <div className="flex items-center gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept={ACCEPTED_EXTENSIONS}
                onChange={handleFileChange}
                className="hidden"
                id="cert-file-input"
              />
              <label
                htmlFor="cert-file-input"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border border-dashed border-slate-600 bg-slate-950/60 text-sm text-slate-300 hover:border-violet-400 hover:text-violet-300 transition-all cursor-pointer"
              >
                <Upload size={16} />
                {selectedFile ? selectedFile.name : "Choose file"}
              </label>
              {selectedFile && (
                <button
                  type="button"
                  onClick={removeFile}
                  className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {fileError && (
              <p className="mt-2 text-sm text-red-400" role="alert">{fileError}</p>
            )}

            {selectedFile && !fileError && (
              <div className="mt-3 flex items-center gap-3">
                {filePreview ? (
                  <img
                    src={filePreview}
                    alt="Certificate preview"
                    className="h-20 w-20 rounded-xl object-cover border border-slate-700"
                  />
                ) : (
                  <div className="h-20 w-20 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center">
                    <FileText size={28} className="text-violet-400" />
                  </div>
                )}
                <div className="text-xs text-slate-400">
                  <p className="font-medium text-slate-300">{selectedFile.name}</p>
                  <p>{formatFileSize(selectedFile.size)}</p>
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 btn-shine"
          >
            <Plus className="h-4 w-4" />
            Upload Certificate
          </button>
        </form>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.length === 0 ? (
            <div className="md:col-span-2 lg:col-span-3 rounded-3xl border border-dashed border-slate-700/70 bg-slate-900/40 p-8 text-center text-slate-400">
              No credentials uploaded yet. Use the form above to upload your certificate file.
            </div>
          ) : (
            certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4, borderColor: "rgba(139,92,246,0.4)" }}
                className="rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md shadow-xl transition-all duration-300 hover:border-indigo-500/40 overflow-hidden"
              >
                {isImage(cert.fileType) && cert.fileDataUrl ? (
                  <div className="h-40 overflow-hidden bg-slate-800">
                    <img
                      src={cert.fileDataUrl}
                      alt={cert.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-40 bg-slate-800/60 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2">
                      <FileText size={36} className="text-violet-400" />
                      <span className="text-xs text-slate-400">{cert.fileName}</span>
                    </div>
                  </div>
                )}

                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                      <BadgeCheck className="h-5 w-5" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-slate-400">{cert.year}</span>
                      <button
                        type="button"
                        onClick={() => removeCertification(cert.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        aria-label={`Remove ${cert.title}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <span className="inline-flex items-center gap-1 rounded-full border border-violet-400/30 bg-violet-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-violet-300">
                      <Award className="h-3 w-3" />
                      {cert.badge || "Credential"}
                    </span>
                    {cert.tag && (
                      <span className="inline-flex items-center rounded-full border border-slate-700/60 bg-slate-800/70 px-2.5 py-0.5 text-[10px] font-medium text-slate-300">
                        {cert.tag}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold text-slate-200 mb-1">{cert.title}</h3>
                  <p className="text-sm font-medium text-violet-300 mb-2">{cert.issuer}</p>
                  {cert.description && (
                    <p className="text-xs leading-6 text-slate-400">{cert.description}</p>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
