<form onSubmit={handleSubmit}>
  {/* @csrf */}
  <Form.Group class="mb-3">
    <Form.Label for="name">Nome modello</Form.Label>
    <Form.Control
      type="text"
      id="name"
      name="name"
      placeholder="ModelloA"
      required
      onChange={(e) => {
        setCreate({
          ...initialSend,
          name: e.target.value,
        });
      }}
      value={initialSend.name}
    />
  </Form.Group>
  <Form.Group className="mb-3">
    <Form.Label for="description">Descrizione</Form.Label>
    <Form.Control
      type="text"
      className="form-control"
      id="description"
      name="description"
      placeholder="Ho preso ispirazione da YouTube"
      required
      onChange={(e) => {
        setCreate({
          ...initialSend,
          description: e.target.value,
        });
      }}
      value={initialSend.description}
    />
  </Form.Group>
  <Form.Group className="mb-3">
    <Form.Label for="used_sw">Software Usato</Form.Label>
    <Form.Control
      type="text"
      className="form-control"
      id="used_sw"
      name="used_sw"
      placeholder="Blender"
      required
      onChange={(e) => {
        setCreate({
          ...initialSend,
          used_sw: e.target.value,
        });
      }}
      value={initialSend.used_sw}
    />
  </Form.Group>
  <Form.Group className="mb-3">
    <Form.Label for="date">Data di creazione</Form.Label>
    <Form.Control
      type="date"
      className="form-control"
      id="date"
      name="date"
      required
      onChange={(e) => {
        setCreate({
          ...initialSend,
          date: e.target.value,
        });
      }}
      value={initialSend.date}
    />
  </Form.Group>
  <Form.Group className="mb-3">
    <Form.Label for="model">File</Form.Label>
    <Form.Control
      type="file"
      className="form-control"
      id="model"
      name="model"
      required
      onChange={(e) => {
        setCreate({
          ...initialSend,
          model: e.target.value,
        });
      }}
      value={initialSend.model}
    />
  </Form.Group>
  <Form.Group className="mb-3">
    <Form.Select
      aria-label="Default select example"
      required
      onChange={(e) => {
        setCreate({
          ...initialSend,
          role: e.target.value,
        });
      }}
      value={initialSend.role}
    >
      <option>Seleziona ruolo</option>
      <option value="owner">Proprietario</option>
      <option value="collaborator">Collaboratore</option>
    </Form.Select>
  </Form.Group>
  <button type="submit" className="btn btn-primary">
    Submit
  </button>
</form>;
