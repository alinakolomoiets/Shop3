using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shop.Data;
using Shop.Models;

namespace Shop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PoodController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public PoodController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public List<Pood> GetPood()
        {
            var pood = _context.Pood.ToList();
            return pood;
        }
        [HttpPost("add")]
        public List<Pood> PostPood([FromBody] Pood pood)
        {
            _context.Pood.Add(pood);
            _context.SaveChanges();
            return _context.Pood.ToList();
        }
        [HttpDelete("delete/{id}")]
        public List<Pood> DeletePood(int id)
        {
            var pood = _context.Pood.Find(id);

            if (pood == null)
            {
                return _context.Pood.ToList();
            }

            _context.Pood.Remove(pood);
            _context.SaveChanges();
            return _context.Pood.ToList();
        }
        [HttpGet("select/{id}")]
        public ActionResult<Pood> GetPood(int id)
        {
            var pood = _context.Pood.Find(id);

            if (pood == null)
            {
                return NotFound();
            }

            return pood;
        }

        [HttpPut("update/{id}")]
        public ActionResult<List<Pood>> PutProducts(int id, [FromBody] Pood updatedPood)
        {
            var pood = _context.Pood.Find(id);

            if (pood == null)
            {
                return NotFound();
            }

            pood.PoodName = updatedPood.PoodName;
            pood.PoodAsukoht = updatedPood.PoodAsukoht;
            pood.ContactInfo = updatedPood.ContactInfo;


            _context.Pood.Update(pood);
            _context.SaveChanges();

            return Ok(_context.Pood);
        }
    }
}