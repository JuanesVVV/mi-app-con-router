import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function PokemonDetail() {
  const location = useLocation();
  const { pokemonId } = location.state || {};
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pokemonId) return;

    const fetchPokemonDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        if (!response.ok) throw new Error('Error al obtener datos del Pokémon');
        const data = await response.json();
        setPokemonDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [pokemonId]);

  if (!pokemonId) return <p>No se proporcionó un ID de Pokémon.</p>;
  if (loading) return <p>Cargando detalles...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="detalle-pokemon">
      <h2>{pokemonDetails.name.toUpperCase()}</h2>
      <img
        src={pokemonDetails.sprites.front_default}
        alt={`Imagen de ${pokemonDetails.name}`}
      />
      <ul>
        <li><strong>Altura:</strong> {pokemonDetails.height}</li>
        <li><strong>Peso:</strong> {pokemonDetails.weight}</li>
        <li><strong>Tipo:</strong> {pokemonDetails.types.map(t => t.type.name).join(', ')}</li>
        <li><strong>Habilidades:</strong> {pokemonDetails.abilities.map(a => a.ability.name).join(', ')}</li>
      </ul>
    </div>
  );
}

export default PokemonDetail;