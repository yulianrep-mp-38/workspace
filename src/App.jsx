import React, { useState } from 'react';

export default function App() {
  // 1. Estado inicial con todos los campos requeridos
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    password: '',
    edad: '',
    fechaNacimiento: '',
    nivelExperiencia: 5,
    aceptarTerminos: false,
    lenguajes: [],
    modalidad: 'presencial',
    pais: '',
    comentarios: '',
    fotoPerfil: null,
    colorFavorito: '#f80000'
  });

  // Estado para guardar la URL de vista previa de la foto
  const [fotoPreview, setFotoPreview] = useState(null);

  // Estado para controlar la visualización del resumen final
  const [resumen, setResumen] = useState(null);

  // 2. Manejador genérico de cambios
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'checkbox' && name === 'lenguajes') {
      // Manejo de grupo de checkboxes (Lenguajes)
      if (checked) {
        setFormData({ ...formData, lenguajes: [...formData.lenguajes, value] });
      } else {
        setFormData({
          ...formData,
          lenguajes: formData.lenguajes.filter((lang) => lang !== value)
        });
      }
    } else if (type === 'checkbox' && name === 'aceptarTerminos') {
      // Manejo de checkbox único
      setFormData({ ...formData, aceptarTerminos: checked });
    } else if (type === 'file') {
      // Manejo del archivo de foto + vista previa (Nivel extra)
      const file = files[0];
      if (file) {
        setFormData({ ...formData, fotoPerfil: file });
        setFotoPreview(URL.createObjectURL(file));
      }
    } else {
      // Manejo para inputs estándar, radio, select, range, etc.
      setFormData({ ...formData, [name]: value });
    }
  };

  // 3. Validación de correo electrónico (expresión regular simple)
  const isEmailValid = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  // 4. Envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones básicas (Nivel extra: Edad > 0)
    if (Number(formData.edad) <= 0) {
      alert('La edad debe ser mayor a 0.');
      return;
    }

    if (!isEmailValid(formData.correo)) {
      alert('Por favor ingresa un correo electrónico válido.');
      return;
    }

    // Si todo es válido, guardamos los datos en el estado del resumen
    setResumen({ ...formData });
  };

  return (
    <div className="container my-5" style={{ maxWidth: '750px' }}>
      <div className="card shadow-sm border-0 p-4">
        <h2 className="card-title text-center mb-4 text-primary fw-bold">
          🎓 Registro de Estudiante
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Nombre completo */}
          <div className="mb-3">
            <label className="form-label font-weight-bold">Nombre completo:</label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          {/* Correo y Contraseña */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Correo electrónico:</label>
              <input
                type="email"
                className={`form-control ${
                  formData.correo && !isEmailValid(formData.correo) ? 'is-invalid' : ''
                }`}
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                required
              />
              {formData.correo && !isEmailValid(formData.correo) && (
                <div className="invalid-feedback">Formato de correo inválido</div>
              )}
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Contraseña:</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Edad y Fecha de Nacimiento */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Edad:</label>
              <input
                type="number"
                className="form-control"
                name="edad"
                value={formData.edad}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Fecha de nacimiento:</label>
              <input
                type="date"
                className="form-control"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Nivel de experiencia (Range) */}
          <div className="mb-3">
            <label className="form-label">
              Nivel de experiencia (1 - 10): <strong>{formData.nivelExperiencia}</strong>
            </label>
            <input
              type="range"
              className="form-range"
              min="1"
              max="10"
              name="nivelExperiencia"
              value={formData.nivelExperiencia}
              onChange={handleChange}
            />
          </div>

          {/* Lenguajes que conoce (Multiple Checkbox) */}
          <div className="mb-3">
            <label className="form-label d-block">Lenguajes que conoce:</label>
            {['JavaScript', 'Python', 'Java', 'C++', 'PHP'].map((lang) => (
              <div key={lang} className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="lenguajes"
                  value={lang}
                  checked={formData.lenguajes.includes(lang)}
                  onChange={handleChange}
                />
                <label className="form-check-label">{lang}</label>
              </div>
            ))}
          </div>

          {/* Modalidad (Radio Group) */}
          <div className="mb-3">
            <label className="form-label d-block">Modalidad de estudio:</label>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="modalidad"
                value="presencial"
                checked={formData.modalidad === 'presencial'}
                onChange={handleChange}
              />
              <label className="form-check-label">Presencial</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="modalidad"
                value="virtual"
                checked={formData.modalidad === 'virtual'}
                onChange={handleChange}
              />
              <label className="form-check-label">Virtual</label>
            </div>
          </div>

          {/* País (Select) y Color Favorito */}
          <div className="row">
            <div className="col-md-8 mb-3">
              <label className="form-label">País de residencia:</label>
              <select
                className="form-select"
                name="pais"
                value={formData.pais}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona un país...</option>
                <option value="Colombia">Colombia</option>
                <option value="México">México</option>
                <option value="Argentina">Argentina</option>
                <option value="España">España</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Color favorito:</label>
              <input
                type="color"
                className="form-control form-control-color w-100"
                name="colorFavorito"
                value={formData.colorFavorito}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Foto de Perfil y Vista Previa */}
          <div className="mb-3">
            <label className="form-label">Foto de perfil:</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              name="fotoPerfil"
              onChange={handleChange}
            />
            {fotoPreview && (
              <div className="mt-2 text-center">
                <span className="d-block text-muted small mb-1">Vista previa:</span>
                <img
                  src={fotoPreview}
                  alt="Vista previa"
                  className="rounded-circle border"
                  style={{ width: '90px', height: '90px', objectFit: 'cover' }}
                />
              </div>
            )}
          </div>

          {/* Comentarios */}
          <div className="mb-3">
            <label className="form-label">Comentarios o bio:</label>
            <textarea
              className="form-control"
              rows="3"
              name="comentarios"
              placeholder="Escribe un breve resumen sobre ti..."
              value={formData.comentarios}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Aceptar Términos (Checkbox único obligatorio) */}
          <div className="form-check mb-4">
            <input
              className="form-check-input"
              type="checkbox"
              id="aceptarTerminos"
              name="aceptarTerminos"
              checked={formData.aceptarTerminos}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="aceptarTerminos">
              Acepto los términos y condiciones del registro *
            </label>
          </div>

          {/* Botón de envío (Deshabilitado si no acepta términos o si el correo no es válido) */}
          <button
            type="submit"
            className="btn btn-primary w-100 fw-bold"
            disabled={!formData.aceptarTerminos || !isEmailValid(formData.correo)}
          >
            Enviar Registro
          </button>
        </form>
      </div>

      {/* RESUMEN DE DATOS REGISTRADOS */}
      {resumen && (
        <div className="card shadow-sm border-0 mt-4 p-4 bg-light">
          <h3 className="card-title text-success fw-bold border-bottom pb-2">
            ✅ Resumen del Registro
          </h3>
          <div className="row mt-3">
            <div className="col-md-8">
              <p><strong>Nombre:</strong> {resumen.nombre}</p>
              <p><strong>Correo:</strong> {resumen.correo}</p>
              <p><strong>Edad:</strong> {resumen.edad} años</p>
              <p><strong>Fecha de nacimiento:</strong> {resumen.fechaNacimiento}</p>
              <p><strong>Nivel de experiencia:</strong> {resumen.nivelExperiencia} / 10</p>
              <p>
                <strong>Lenguajes:</strong>{' '}
                {resumen.lenguajes.length > 0 ? resumen.lenguajes.join(', ') : 'Ninguno'}
              </p>
              <p><strong>Modalidad:</strong> {resumen.modalidad}</p>
              <p><strong>País:</strong> {resumen.pais}</p>
              <p>
                <strong>Color favorito:</strong>{' '}
                <span
                  style={{
                    backgroundColor: resumen.colorFavorito,
                    padding: '2px 12px',
                    borderRadius: '4px',
                    color: '#fff'
                  }}
                >
                  {resumen.colorFavorito}
                </span>
              </p>
              <p><strong>Comentarios:</strong> {resumen.comentarios || 'Sin comentarios'}</p>
            </div>

            {fotoPreview && (
              <div className="col-md-4 text-center my-auto">
                <p><strong>Foto cargada:</strong></p>
                <img
                  src={fotoPreview}
                  alt="Perfil Registrado"
                  className="rounded-circle border shadow-sm"
                  style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}