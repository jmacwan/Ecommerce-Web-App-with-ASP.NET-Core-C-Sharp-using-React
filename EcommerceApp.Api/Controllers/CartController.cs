using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ECommerceApp.Api.Data;
using ECommerceApp.Api.Models;

namespace ECommerceApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CartController(AppDbContext context)
        {
            _context = context;
        }

        // For demo: userId passed as query; in real app use auth
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CartItem>>> GetCart([FromQuery] string userId)
        {
            return await _context.CartItems
                .Include(c => c.Product)
                .Where(c => c.UserId == userId)
                .ToListAsync();
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddToCart([FromBody] CartItem item)
        {
            var existing = await _context.CartItems
                .FirstOrDefaultAsync(c => c.UserId == item.UserId && c.ProductId == item.ProductId);

            if (existing != null)
            {
                existing.Quantity += item.Quantity;
            }
            else
            {
                _context.CartItems.Add(item);
            }

            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("remove")]
        public async Task<IActionResult> RemoveFromCart([FromBody] CartItem item)
        {
            var existing = await _context.CartItems
                .FirstOrDefaultAsync(c => c.UserId == item.UserId && c.ProductId == item.ProductId);

            if (existing == null) return NotFound();

            _context.CartItems.Remove(existing);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
