@AGENTS.md
   
      {mockproducts.map((product) => (
        <div key={product.id} style={{ marginBottom: '1rem' }}>
            <img src={product.image}></img>
          <h2>{product.name}</h2>
          <p>Price: ${product.price}</p>
          <p>{product.description}</p>
        </div>
      ))}