using GestoresAPI.Context;
using GestoresAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GestoresAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class GestoresController : ControllerBase
    {

        // Contexto:
        private readonly AppDBContext _context;

        public GestoresController(AppDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult Get() {
           try  {
                return Ok(_context.gestores.ToList());
           } catch (Exception ex) {
                // return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
                return BadRequest(ex.Message);
           }
        }

        [HttpGet("{id}", Name = "GetGestor ")]
        public ActionResult Get(int id) {
            try
            {
                var gestores = _context.gestores.FirstOrDefault( x => x.Id == id );
                return Ok(gestores);
            }
            catch (Exception ex) {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost]
        public ActionResult Post([FromBody] GestoresModel gestor) { 
            try
            {
                _context.gestores.Add(gestor);
                _context.SaveChanges();
                //return CreatedAtRoute("GesGestor", new { id = gestor.Id }, gestor);
                return Ok(gestor);
            } catch (Exception ex) {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] GestoresModel gestor) {
            try
            {
                if (gestor.Id == id) {
                    _context.Entry(gestor).State = EntityState.Modified;
                    _context.SaveChanges();
                    return Ok(gestor);
                } else { 
                    return BadRequest();
                }                
            } catch (Exception ex) {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id) { 
            try
            {
                var gestor = _context.gestores.FirstOrDefault(x => x.Id == id);
                if (gestor != null) {
                    _context.gestores.Remove(gestor);
                    _context.SaveChanges();
                    return Ok(id);
                } else
                {
                    return BadRequest();
                }                
            } catch (Exception ex) {
                return BadRequest(ex.Message);
            }
        }
        
    }
}
