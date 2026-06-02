import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CATEGORIES } from '../../data/menuProducts';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../store/slices/productSlice';

const itemSchema = z.object({
  title: z.string().min(1, "Item Name is required"),
  itemNo: z.string().min(1, "Item Number is required"),
  price: z.coerce.number().min(1, "Price is required"),
  category: z.string().min(1, "Category is required"),
  isVeg: z.enum(["true", "false"], { errorMap: () => ({ message: "Veg / Non Veg is required" }) })
});

export const AddItemModal = ({ isOpen, onClose }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    resolver: zodResolver(itemSchema),
    mode: "onSubmit",
    defaultValues: { title: '', itemNo: '', price: '', category: '', isVeg: '' }
  });

  useEffect(() => {
    if (isOpen) {
      reset();
      setImagePreview(null);
    }
  }, [isOpen, reset]);

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
  };

  const onSubmit = (data) => {
    const newItem = {
      itemNo: data.itemNo,
      title: data.title,
      price: data.price.toString(),
      isVeg: data.isVeg === "true",
      image: imagePreview || '', // Fallback to empty if no image provided
      category: data.category,
      specialInstructionGroups: [],
      isAvailable: true,
      stock: 'In Stock'
    };

    dispatch(addProduct(newItem));
    onClose();
  };

  const inputClass = "w-full bg-[var(--color-neutral-100)] border border-[var(--color-neutral-300)] rounded-[16px] px-4 py-3 outline-none text-subtitle-1 text-[var(--color-neutral-800)] placeholder-[var(--color-neutral-500)]";
  const errorClass = "text-red-500 text-sm mt-1";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-[24px] w-full max-w-[600px] max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-[var(--color-neutral-200)] flex justify-between items-center z-10">
          <h2 className="text-[20px] font-bold text-[#32324d]">Add Item</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="#32324D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--color-neutral-700)] mb-1">Item Name *</label>
              <input type="text" className={inputClass} placeholder="e.g. Alu Gobi" {...register('title')} />
              {errors.title && <p className={errorClass}>{errors.title.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-neutral-700)] mb-1">Item Number *</label>
              <input type="text" className={inputClass} placeholder="e.g. 101" {...register('itemNo')} />
              {errors.itemNo && <p className={errorClass}>{errors.itemNo.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--color-neutral-700)] mb-1">Price *</label>
              <input type="number" className={inputClass} placeholder="e.g. 110" {...register('price')} />
              {errors.price && <p className={errorClass}>{errors.price.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-neutral-700)] mb-1">Category *</label>
              <select className={inputClass} {...register('category')}>
                <option value="">Select Category</option>
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && <p className={errorClass}>{errors.category.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-neutral-700)] mb-1">Veg / Non Veg *</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input type="radio" value="true" {...register('isVeg')} />
                Veg
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" value="false" {...register('isVeg')} />
                Non Veg
              </label>
            </div>
            {errors.isVeg && <p className={errorClass}>{errors.isVeg.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-neutral-700)] mb-1">Image Upload</label>
            {!imagePreview ? (
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-[16px]">
                <div className="space-y-1 text-center">
                  <div className="flex text-sm text-gray-600 justify-center">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-[var(--color-primary)] hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[var(--color-primary)]">
                      <span>Upload an image</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                </div>
              </div>
            ) : (
              <div className="mt-1 relative border rounded-[16px] overflow-hidden w-fit">
                <img src={imagePreview} alt="Preview" className="h-32 object-cover" />
                <button type="button" onClick={handleRemoveImage} className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-gray-100">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-[var(--color-neutral-200)] flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-6 py-3 rounded-[16px] font-bold text-[var(--color-neutral-700)] bg-[var(--color-neutral-100)] hover:bg-[var(--color-neutral-200)] transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-6 py-3 rounded-[16px] font-bold text-white bg-[var(--color-primary)] hover:bg-orange-500 transition-colors">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
