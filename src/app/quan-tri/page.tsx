"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Copy, Flame, Plus, Sparkles, Trash2 } from "lucide-react";
import CandleArt from "@/components/CandleArt";
import {
  FAMILIES,
  MOODS,
  PRODUCTS,
  deleteCustomProduct,
  formatVND,
  getCustomProducts,
  saveCustomProduct,
  type Mood,
  type Product,
  type ScentFamily,
} from "@/lib/products";

const COLOR_PRESETS = [
  { name: "Vàng chanh", wax: "#F4F1C9", accent: "#8DB560" },
  { name: "Trắng ngà hoa bưởi", wax: "#FFF8E8", accent: "#E9B949" },
  { name: "Tím oải hương", wax: "#EDE6F5", accent: "#9B86C4" },
  { name: "Nâu gỗ trầm", wax: "#F3E3C8", accent: "#8A5A35" },
  { name: "Cam quế mật ong", wax: "#FBE3C2", accent: "#E07B1A" },
  { name: "Xanh lá trà", wax: "#E6F0D8", accent: "#548333" },
  { name: "Kem dừa non", wax: "#FFF6E9", accent: "#D9A066" },
  { name: "Xanh rêu rừng", wax: "#DCE8D0", accent: "#3B6324" },
  { name: "Hồng cánh sen", wax: "#FCEFF0", accent: "#D98A9A" },
];

export default function AdminPage() {
  const [customList, setCustomList] = useState<Product[]>([]);
  const [copied, setCopied] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [price, setPrice] = useState(199000);
  const [selectedFamilies, setSelectedFamilies] = useState<ScentFamily[]>(["cam-chanh"]);
  const [selectedMoods, setSelectedMoods] = useState<Mood[]>(["thu-gian"]);
  const [topNote, setTopNote] = useState("Vỏ bưởi, chanh tươi");
  const [heartNote, setHeartNote] = useState("Hoa nhài, sả chanh");
  const [baseNote, setBaseNote] = useState("Gỗ tuyết tùng, hổ phách");
  const [description, setDescription] = useState("Mùi hương thảo mộc thanh dịu, xua tan căng thẳng sau giờ làm việc.");
  const [inspiration, setInspiration] = useState("Lấy cảm hứng từ những khu vườn sớm mai ở miền quê Việt Nam.");
  const [wax, setWax] = useState("#F4F1C9");
  const [accent, setAccent] = useState("#8DB560");
  const [badge, setBadge] = useState("Mới ra mắt");

  useEffect(() => {
    setCustomList(getCustomProducts());
    const onUpdate = () => setCustomList(getCustomProducts());
    window.addEventListener("luvia:products-updated", onUpdate);
    return () => window.removeEventListener("luvia:products-updated", onUpdate);
  }, []);

  const makeSlug = (str: string) => {
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const previewProduct: Product = {
    slug: makeSlug(name || "nen-moi"),
    name: name || "Tên Nến Thơm Của Bạn",
    tagline: tagline || "Dòng khẩu hiệu gợi cảm hứng thư thái",
    families: selectedFamilies,
    moods: selectedMoods,
    price,
    notes: { top: topNote, heart: heartNote, base: baseNote },
    description,
    inspiration,
    wax,
    accent,
    badge: badge || undefined,
    rating: 5.0,
    reviews: 1,
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return alert("Vui lòng nhập tên nến!");

    saveCustomProduct(previewProduct);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);

    // Reset some fields
    setName("");
    setTagline("");
  };

  const handleDelete = (slug: string) => {
    if (confirm("Bạn có chắc muốn xóa nến này khỏi danh mục không?")) {
      deleteCustomProduct(slug);
    }
  };

  const handleExportCode = () => {
    const code = JSON.stringify(previewProduct, null, 2);
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/san-pham" className="flex items-center gap-1 text-sm font-semibold text-leaf hover:underline">
          <ArrowLeft className="size-4" /> Quay lại Cửa Hàng
        </Link>
        <span className="rounded-full bg-leaf-soft px-3.5 py-1 text-xs font-bold text-leaf-dark">
          ⚙ Quản trị danh mục nến (Thêm nến mới)
        </span>
      </div>

      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        {/* FORM THÊM NẾN MỚI */}
        <div className="rounded-[36px] bg-white p-8 shadow-sm ring-1 ring-leaf/10">
          <h1 className="text-2xl font-extrabold text-ink">Thêm Nến Mới Vào Cửa Hàng</h1>
          <p className="mt-1 text-xs text-ink-soft">
            Điền thông tin bên dưới, nến mới sẽ lập tức xuất hiện trên Website và được AI tư vấn!
          </p>

          {success && (
            <div className="mt-4 flex items-center gap-2 rounded-2xl bg-leaf-soft p-4 text-sm font-bold text-leaf-dark">
              <Check className="size-5" /> Đã lưu nến vào cửa hàng thành công! Mở tab Cửa Hàng để xem nhé.
            </div>
          )}

          <form onSubmit={handleSave} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-ink mb-1">Tên nến thơm *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ví dụ: Cam Ngọt Ban Mai"
                className="w-full rounded-2xl border border-leaf/20 bg-cream px-4 py-2.5 text-sm font-semibold focus:border-leaf focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-ink mb-1">Khẩu hiệu / Cảm xúc nến (Tagline)</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="Ví dụ: Đánh thức giác quan, ngọt lành và tràn trề năng lượng"
                className="w-full rounded-2xl border border-leaf/20 bg-cream px-4 py-2.5 text-sm focus:border-leaf focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-ink mb-1">Giá size Classic 200g (VNĐ) *</label>
                <input
                  type="number"
                  step="1000"
                  required
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full rounded-2xl border border-leaf/20 bg-cream px-4 py-2.5 text-sm font-bold text-leaf focus:border-leaf focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-ink mb-1">Huy hiệu (Badge)</label>
                <input
                  type="text"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  placeholder="Mới, Bán chạy, Thuần Việt..."
                  className="w-full rounded-2xl border border-leaf/20 bg-cream px-4 py-2.5 text-sm focus:border-leaf focus:outline-none"
                />
              </div>
            </div>

            {/* CHỌN MÀU THEO PRESET */}
            <div>
              <label className="block text-xs font-bold text-ink mb-1.5">Màu sắc sáp nến & tem nhãn</label>
              <div className="flex flex-wrap gap-2">
                {COLOR_PRESETS.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => {
                      setWax(c.wax);
                      setAccent(c.accent);
                    }}
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border transition ${
                      wax === c.wax ? "border-leaf ring-2 ring-leaf" : "border-leaf/20 hover:bg-cream"
                    }`}
                  >
                    <span className="size-3.5 rounded-full border border-black/10" style={{ background: c.wax }} />
                    <span className="size-3.5 rounded-full border border-black/10" style={{ background: c.accent }} />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* TẦNG HƯƠNG */}
            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <label className="block text-xs font-bold text-ink mb-1">Hương đầu (Top note)</label>
                <input
                  type="text"
                  value={topNote}
                  onChange={(e) => setTopNote(e.target.value)}
                  className="w-full rounded-2xl border border-leaf/20 bg-cream px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-ink mb-1">Hương giữa (Heart note)</label>
                <input
                  type="text"
                  value={heartNote}
                  onChange={(e) => setHeartNote(e.target.value)}
                  className="w-full rounded-2xl border border-leaf/20 bg-cream px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-ink mb-1">Hương cuối (Base note)</label>
                <input
                  type="text"
                  value={baseNote}
                  onChange={(e) => setBaseNote(e.target.value)}
                  className="w-full rounded-2xl border border-leaf/20 bg-cream px-3 py-2 text-xs"
                />
              </div>
            </div>

            {/* MÔ TẢ */}
            <div>
              <label className="block text-xs font-bold text-ink mb-1">Mô tả sản phẩm</label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-2xl border border-leaf/20 bg-cream px-4 py-2 text-xs"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 rounded-full bg-leaf py-3.5 text-sm font-bold text-white shadow-md hover:bg-leaf-dark active:scale-95 transition"
              >
                + Lưu vào Cửa Hàng
              </button>
              <button
                type="button"
                onClick={handleExportCode}
                className="rounded-full border border-leaf/30 bg-white px-5 py-3.5 text-xs font-semibold text-leaf hover:bg-cream"
              >
                {copied ? "Đã copy JSON ✓" : <><Copy className="size-3.5 inline mr-1" /> Copy JSON</>}
              </button>
            </div>
          </form>
        </div>

        {/* CỘT PREVIEW THỜI GIAN THỰC & DANH SÁCH ĐÃ THÊM */}
        <div className="space-y-6">
          <div className="rounded-[36px] bg-white p-7 shadow-sm ring-1 ring-leaf/10 text-center">
            <span className="brush-tag text-sm mb-3 inline-block">Xem trước hũ nến mới</span>
            <div className="mx-auto mt-2 aspect-square max-w-[280px] rounded-3xl bg-cream flex items-center justify-center p-6 border border-leaf/15">
              <CandleArt product={previewProduct} className="h-full w-auto drop-shadow-xl" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-ink">{previewProduct.name}</h3>
            <p className="text-xs text-leaf font-medium mt-1">{previewProduct.tagline}</p>
            <p className="mt-2 text-lg font-black text-leaf-dark">{formatVND(previewProduct.price)}</p>
          </div>

          {/* DANH SÁCH CÁC NẾN CUSTOM ĐÃ THÊM */}
          <div className="rounded-[36px] bg-white p-6 shadow-sm ring-1 ring-leaf/10">
            <h3 className="text-sm font-bold text-ink uppercase tracking-wider mb-3">
              Nến do bạn tự thêm ({customList.length})
            </h3>
            {customList.length === 0 ? (
              <p className="text-xs text-ink-soft italic">
                Chưa có nến nào được thêm. Hãy điền form bên cạnh để tạo hũ nến đầu tiên!
              </p>
            ) : (
              <div className="divide-y divide-leaf/10">
                {customList.map((c) => (
                  <div key={c.slug} className="flex items-center justify-between py-3">
                    <div>
                      <p className="text-sm font-bold text-ink">{c.name}</p>
                      <p className="text-xs text-leaf font-semibold">{formatVND(c.price)}</p>
                    </div>
                    <button
                      onClick={() => handleDelete(c.slug)}
                      className="grid size-8 place-items-center rounded-full text-ink-soft hover:bg-red-50 hover:text-red-500"
                      title="Xóa"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
