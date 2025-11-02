import { Plus } from 'lucide-react';

import { MovieModal, MovieList } from '../components';
import { useMovieList, useMovieModal } from '../hooks';

export default function MoviePage() {
  const { movies, loading, error, createMovie, updateMovie, deleteMovie } = useMovieList();
  const { isModalOpen, editingMovie, openAddModal, openEditModal, closeModal, saveMovie, removeMovie } = useMovieModal({ onCreate: createMovie, onUpdate: updateMovie, onDelete: deleteMovie });

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-12">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Daftar Film</h2>
          <p className="text-slate-400">Kelola koleksi film favorit Anda</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          <Plus size={20} />
          Tambah Film
        </button>
      </div>

      {/* Movie List */}
      <MovieList
        movies={movies}
        loading={loading}
        error={error}
        onEdit={openEditModal}
        onDelete={removeMovie}
      />

      {/* Modal */}
      <MovieModal
        isOpen={isModalOpen}
        title={editingMovie ? 'Edit Film' : 'Tambah Film Baru'}
        initialData={editingMovie}
        onSubmit={saveMovie}
        onClose={closeModal}
      />
    </>
  );
}