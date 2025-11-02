import { MovieCard, ErrorAlert } from '../../components';

export default function MovieList({ movies, loading, error, onEdit, onDelete }) {
  // Error state
  { error && <ErrorAlert message={error} /> }

  // Loading state
  if (loading) {
    return (
      <div className="col-span-full text-center py-12">
        <p className="text-slate-400 font-medium">Memuat data film...</p>
      </div>
    );
  }

  // Empty state
  if (movies.length === 0) {
    return (
      <div className="col-span-full text-center py-12">
        <p className="text-slate-400 font-medium">Belum ada film 🎬</p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}