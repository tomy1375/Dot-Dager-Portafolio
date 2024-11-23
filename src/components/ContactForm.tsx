'use client'

import React, { useState, useRef } from 'react';
import type { FormEvent } from 'react';
import Swal from 'sweetalert2';

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(formRef.current!);

    formData.append('access_key', '56a77bea-6ef6-4788-b4d4-58ed2353ee4');
//agregar al final 3
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Mensaje enviado con éxito',
          confirmButtonColor: '#9333ea', // Tailwind's purple-600
        });
        formRef.current?.reset();
      } else {
        throw new Error(result.message || 'Error al enviar el mensaje');
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al enviar el mensaje. Por favor, intenta de nuevo.',
        confirmButtonColor: '#9333ea', // Tailwind's purple-600
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col mt-10 w-full text-base tracking-normal text-white text-opacity-60 max-md:mt-10">
      <div className="flex gap-3.5 items-start w-full">
        <input
          type="text"
          name="name"
          placeholder="Nombre y apellido"
          aria-label="Nombre y apellido"
          className="flex-1 shrink px-3.5 py-3 w-full rounded-md border border-solid bg-white bg-opacity-10 border-white border-opacity-20 min-w-[240px]"
          required
        />
      </div>
      <input
        type="email"
        name="email"
        placeholder="Email"
        aria-label="Email"
        className="px-3.5 py-3 mt-3.5 w-full whitespace-nowrap rounded-md border border-solid bg-white bg-opacity-10 border-white border-opacity-20"
        required
      />
      <input
        type="text"
        name="subject"
        placeholder="Asunto"
        aria-label="Asunto"
        className="px-3.5 py-3 mt-3.5 w-full whitespace-nowrap rounded-md border border-solid bg-white bg-opacity-10 border-white border-opacity-20"
        required
      />
      <textarea
        name="message"
        placeholder="Mensaje"
        aria-label="Mensaje"
        className="px-3.5 pt-3 pb-20 mt-3.5 w-full whitespace-nowrap rounded-md border border-solid bg-white bg-opacity-10 border-white border-opacity-20 min-h-[109px]"
        required
      ></textarea>
      <button
        type="submit"
        disabled={isSubmitting}
        className="px-6 py-3 mt-5 text-white bg-green-800 rounded-md hover:bg-green-900 transition-colors duration-300"
      >
        {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
      </button>
    </form>
  );
}