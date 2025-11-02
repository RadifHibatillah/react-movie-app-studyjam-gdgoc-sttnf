import { useState } from "react";

/**
 * Hook untuk mengatur state & logika modal Add/Edit Movie
 * @param {*} onCreate 
 * @param {*} onUpdate 
 * @param {*} onDelete 
 * @returns { isModalOpen, editingMovie, openAddModal, openEditModal, closeModal, saveMovie, removeMovie }
 */
export const useMovieModal = ({ onCreate, onUpdate, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);

  // --- Open/Close Modal ---
  const openAddModal = () => {
    setEditingMovie(null);
    setIsModalOpen(true);
  };

  const openEditModal = (movie) => {
    setEditingMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingMovie(null);
  };

  // Save Movie (Create/Update)
  const saveMovie = async (formData) => {
    const result = editingMovie
      ? await onUpdate(editingMovie.id, formData)
      : await onCreate(formData);

    if (result.success) closeModal();
    else alert("Gagal menyimpan film: " + result.error);
  };

  // Delete movie dengan konfirmasi
  const removeMovie = async (id) => {
    if (!confirm("Hapus film ini?")) return;
    await onDelete(id);
  };

  return {
    isModalOpen,
    editingMovie,
    openAddModal,
    openEditModal,
    closeModal,
    saveMovie,
    removeMovie,
  };
};
