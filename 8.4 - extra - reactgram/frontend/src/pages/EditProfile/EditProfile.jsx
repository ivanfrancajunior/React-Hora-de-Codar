import React from 'react';
import './EditProfile.css';

const EditProfile = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div id="edit-profile">
      <h2>Edite suas informações</h2>
      <p className="subtitle">
        {' '}
        Adicione uma imagem de perfil e conte mais sobre você
      </p>
      {/* image preview */}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome" />
        <input type="email" disabled placeholder="E-mail" />
        <label>
          <span>Imagem de perfil</span>
          <input type="file" />
        </label>
        <label>
          <span>Bio:</span>
          <input type="text" placeholder="Descrição do perfil" />
        </label>
        <label>
          <span>Deseja alterar sua senha?</span>
          <input type="password" placeholder="Atualize sua senha" />
        </label>
        <input type="submit" value={'Atualizar perfil'} />
      </form>
    </div>
  );
};

export default EditProfile;