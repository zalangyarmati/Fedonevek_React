using Fedonevek_React.Hubs;
using Fedonevek_React.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;

namespace Fedonevek_React.Controllers
{
    [Route("/api/message")]
    [ApiController]
    public class MessageController : Controller
    {
        protected readonly IHubContext<MessageHub> _messageHub;
        public MessageController([NotNull] IHubContext<MessageHub> messageHub)
        {
            _messageHub = messageHub;
        }

        [HttpPost]
        public async Task<IActionResult> Create(MessagePost messagePost)
        {
            await _messageHub.Clients.All.SendAsync("sendToAll", messagePost.Sender +": " + messagePost.Message);
            return Ok();
        }
    }


}
