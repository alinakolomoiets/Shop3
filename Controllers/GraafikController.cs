using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shop.Data;
using Shop.Models;

namespace Shop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GraafikController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public GraafikController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public List<Graafik> GetGraafik()
        {
            var graafik = _context.Graafik.ToList();
            return graafik;
        }
        [HttpPost("add")]
        public List<Graafik> PostGraafik([FromBody] Graafik graafik)
        {
            _context.Graafik.Add(graafik);
            _context.SaveChanges();
            return _context.Graafik.ToList();
        }
        [HttpDelete("delete/{id}")]
        public List<Graafik> DeleteGraafik(int id)
        {
            var graafik = _context.Graafik.Find(id);

            if (graafik == null)
            {
                return _context.Graafik.ToList();
            }

            _context.Graafik.Remove(graafik);
            _context.SaveChanges();
            return _context.Graafik.ToList();
        }
        [HttpGet("select/{id}")]
        public ActionResult<Pood> GetGraafik(int id)
        {
            var pood = _context.Pood.Find(id);
            if (pood == null)
            {
                return NotFound();
            }
            return pood;
        }
        [HttpPut("update/{id}")]
        public ActionResult<List<Graafik>> PutGraafik(int id, [FromBody] Graafik updatedGraafik)
        {
            var graafik = _context.Graafik.Find(id);

            if (graafik == null)
            {
                return NotFound();
            }
            graafik.PoodId = updatedGraafik.PoodId;
            graafik.Paev = updatedGraafik.Paev;
            graafik.AvatudAeg = updatedGraafik.AvatudAeg;
            graafik.SuletudAeg = updatedGraafik.SuletudAeg;

            _context.Graafik.Update(graafik);
            _context.SaveChanges();

            return Ok(_context.Graafik);
        }
    }
}