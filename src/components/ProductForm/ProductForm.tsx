import { Prisma } from "@prisma/client";
import styles from "./ProductForm.module.css";

interface ProductFormData {
  id: string;
  name: string;
  price: Prisma.Decimal | number | string;
  stock: number;
  description: string | null;
  categoryId: string | null;
  artisanId?: string | null;
}

interface ProductFormProps {
  action: (formData: FormData) => Promise<void>;
  categories: { id: string; name: string }[];
  artisans?: { id: string; name: string | null }[];
  product?: ProductFormData;
}

export default function ProductForm({
  action,
  categories,
  artisans,
  product,
}: ProductFormProps) {
  return (
    <form
      action={action}
      className={`card card--pad ${styles.form}`}
    >
      {product && (
        <input type="hidden" name="productId" value={product.id} />
      )}

      <div className="form-field">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="input"
          defaultValue={product?.name ?? ""}
        />
      </div>

      <div className={styles.row}>
        <div className="form-field">
          <label htmlFor="price" className="form-label">
            Price (USD)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            required
            min="0"
            step="0.01"
            className="input"
            defaultValue={product?.price.toString() ?? ""}
          />
        </div>

        <div className="form-field">
          <label htmlFor="stock" className="form-label">
            Stock
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            required
            min="0"
            step="1"
            className="input"
            defaultValue={product?.stock.toString() ?? "0"}
          />
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="categoryId" className="form-label">
          Category
        </label>
        <select
          id="categoryId"
          name="categoryId"
          className="input"
          defaultValue={product?.categoryId ?? ""}
        >
          <option value="">No category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {artisans && (
        <div className="form-field">
          <label htmlFor="artisanId" className="form-label">
            Artisan
          </label>
          <select
            id="artisanId"
            name="artisanId"
            className="input"
            defaultValue={product?.artisanId ?? ""}
          >
            <option value="">No artisan</option>
            {artisans.map((artisan) => (
              <option key={artisan.id} value={artisan.id}>
                {artisan.name ?? "Unnamed artisan"}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="form-field">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={5}
          className="textarea"
          defaultValue={product?.description ?? ""}
        />
      </div>

      <div className="form-field">
        <label htmlFor="imageUrl" className="form-label">
          Image URL (optional)
        </label>
        <input
          type="url"
          id="imageUrl"
          name="imageUrl"
          placeholder="https://images.unsplash.com/..."
          className="input"
        />
      </div>

      <button type="submit" className="btn btn-primary btn--block">
        {product ? "Save changes" : "Create product"}
      </button>
    </form>
  );
}