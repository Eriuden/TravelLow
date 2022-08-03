import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div>
      <div>
        <h1>Travel low</h1>
        <h2>pour à moindre frais voyager, sans arrières pensées</h2>
      </div>

      <nav>
        <Link to = {"/"}>Acceuil</Link>
        <Link to = {"/connexion"}>Connexion</Link>
        <Link to = {"/inscription"}>Inscription</Link>
      </nav>
    
        
    </div>
  )
}
